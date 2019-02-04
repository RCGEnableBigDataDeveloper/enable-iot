package com.rcggs.enable.data.controller;

import java.io.IOException;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.SchedulerException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.base.Throwables;
import com.rcggs.datalake.configuration.DatalakeContext;
import com.rcggs.datalake.core.model.Route;

@RestController
public class JobController extends AbstractController {

	final Logger logger = Logger.getLogger(getClass());

	@RequestMapping(value = "/getStatistics/{id}/{count}", method = RequestMethod.GET)
	public String getStatistics(final @PathVariable String id, final @PathVariable int count) {
		Connection conn = null;
		try {
			
			List<String> statsList = new ArrayList<String>();
			String stats = null;
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection("jdbc:mysql://172.16.10.5/DATALAKE", "root", "root");
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery("select id, route from dl_statistics where id='" + id + "'");
			while (rs.next()) {
				stats = rs.getString(2);
				statsList.add(stats.substring(1, stats.length() - 1).replaceAll("\\\\", ""));
			}

			if (stats == null || statsList.size() < count)
				return null;

			return StringUtils.join(statsList, ",");

		} catch (Exception e) {
			logger.error(Throwables.getStackTraceAsString(e));
			e.printStackTrace();
			return "{\"id\":\"" + id + "\",\"status\":\"failed to get stats\"}";

		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	@RequestMapping(value = "/runnow/{name}", method = RequestMethod.POST)
	public String runnow(final @RequestBody Route[] name) {

		try {
			System.err.println(ow.writeValueAsString(name));
			scheduleJob(UUID.randomUUID().toString(), "New Event", new Date(), "", ow.writeValueAsString(name));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return "{}";
	}

	@RequestMapping(value = "/deleteJob/{name}", method = RequestMethod.POST)
	public boolean deleteJob(@RequestBody String name) {
		boolean updated = false;
		try {

			name = URLDecoder.decode(name, "UTF-8");
			JsonNode node = mapper.readTree(name);

			String id = String.valueOf(node.get("id").asLong());
			String text = node.get("text").asText();
			String desc = node.get("desc").toString();

			List<Map<String, String>> ids = DatalakeContext.getJobDao().getJobKeys(desc, text);
			for (Map<String, String> idmap : ids) {
				DatalakeContext.deleteJob(idmap.get("name"), idmap.get("group"));
			}

			updated = DatalakeContext.getJobDao().deleteJob(id);

		} catch (SchedulerException | IOException e) {
			e.printStackTrace();
		}

		return updated;
	}

	@RequestMapping(value = "/getAllScheduledJobs/{name}", method = RequestMethod.POST)
	public String getAllScheduledJobs(final @RequestBody String name) {
		try {
			return ow.writeValueAsString(DatalakeContext.getJobDao().getAllScheduledJobs(name));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/schedule", method = RequestMethod.POST)
	public void schedule(@RequestBody String name) {

		try {
			name = URLDecoder.decode(name, "UTF-8");
			JsonNode node = mapper.readTree(name);
			String id = String.valueOf(node.get("id").asLong());
			String text = node.get("text").asText();
			String date = node.get("start").asText();
			String desc = node.get("desc").toString();
			String data = node.get("data").asText().replaceAll("\\\"", "\"");

			java.util.Date realdate = new org.joda.time.DateTime(date).toDate();

			scheduleJob(id, text, realdate, desc, data);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	void scheduleJob(final String id, final String text, final Date date, final String desc, final String data) {

		try {

			logger.info("scheduling job " + id + " for " + date);

			Map<String, Object> m = new HashMap<String, Object>();
			m.put("name", text);
			m.put("id", id);
			m.put("date", date);
			m.put("data", data);

			DatalakeContext.scheduleJob(text + "-" + id, UUID.randomUUID().toString(), desc,
					(Class<? extends Job>) Class.forName(DatalakeContext.getProperty("datalake.job.execution.class")),
					date, null, null, m);

			DatalakeContext.getJobDao().saveJob(m);

		} catch (SchedulerException | ParseException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/jobs/{name}", method = RequestMethod.GET)
	public String jobs(final @PathVariable String name) throws Exception {
		List<Map<String, String>> data = DatalakeContext.getJobDao().getAllJobs(name);
		if (data.size() == 0) {
			return null;
		} else {
			return ow.writeValueAsString(data);
		}
	}
}
