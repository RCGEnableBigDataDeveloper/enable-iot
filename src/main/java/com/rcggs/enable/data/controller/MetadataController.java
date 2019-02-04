package com.rcggs.enable.data.controller;

import java.io.IOException;
import java.lang.Thread.UncaughtExceptionHandler;
import java.net.URLDecoder;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ThreadFactory;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Throwables;
import com.google.common.util.concurrent.ThreadFactoryBuilder;
import com.rcggs.datalake.configuration.DatalakeContext;
import com.rcggs.datalake.connect.DatalakeConnectionFactory;
import com.rcggs.datalake.core.model.ConnectionConfig;
import com.rcggs.datalake.core.model.Level;
import com.rcggs.datalake.core.model.Message;
import com.rcggs.datalake.core.model.MessageType;
import com.rcggs.datalake.core.model.SchemaDef;
import com.rcggs.datalake.core.model.TransformerConfig;
import com.rcggs.datalake.resource.ResourceReader;

@RestController
public class MetadataController extends AbstractController {

	final Logger logger = Logger.getLogger(getClass());
	ObjectMapper mapper = new ObjectMapper();

	// @Resource
	DatalakeConnectionFactory datalakeConnectionFactory = new DatalakeConnectionFactory();

	@RequestMapping(value = "/getOptions/{name}", method = RequestMethod.GET, produces = "application/json")
	public String getOptions(final @PathVariable String name) {
			List<Map<String, String>> data = DatalakeContext.getMetadataDao().getOptions(name);
		try {
			return ow.writeValueAsString(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getConnectionsResponse", method = RequestMethod.GET, produces = "application/json")
	public String getConnectionsResponse(@RequestBody String data) {
		return getConnections("");
	}

	@RequestMapping(value = "/getServices", method = RequestMethod.GET, produces = "application/json")
	public String getServices(@RequestBody String data) {
		List<Map<String, String>> response = new LinkedList<Map<String, String>>();
		List<Map<String, String>> services = DatalakeContext.getMetadataDao().getServices("");
		try {
			for (Map<String, String> service : services) {
				Map<String, String> map = new LinkedHashMap<String, String>();
				map.put("id", service.get("id"));
				map.put("name", service.get("name"));
				map.put("description", service.get("description"));
				map.put("tags", service.get("tags"));
				String route = service.get("route");
				org.codehaus.jackson.JsonNode _route_ = mapper.readTree(route);
				System.err.println(_route_.get("target").get("config").toString());
				map.put("location",
						_route_.get("target").get("config").get("type").getTextValue() + "://"
								+ _route_.get("target").get("config").get("host").getTextValue() + ":"
								+ _route_.get("target").get("config").get("port").getTextValue()
								+ _route_.get("target").get("config").get("path").getTextValue());
				map.put("owner", "admin@rcggs.com");
				response.add(map);
			}
			return ow.writeValueAsString(response);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getSchema/{id}", method = RequestMethod.POST)
	public String getSchema(@RequestBody Object  data) {
		try {

//			data = URLDecoder.decode(data, "UTF-8");
//
//			JsonNode schemaData = mapper.readTree(data);

//			String schemaType = schemaData.get(0).get("schematype").getTextValue();
//			String protocol = schemaData.get(0).get("protocol").getTextValue();
//			String schemaPath = schemaData.get(0).get("schemapath").getTextValue();

			@SuppressWarnings("unchecked")
			ResourceReader<SchemaDef> schemaReader = (ResourceReader<SchemaDef>) Class
					.forName(DatalakeContext.getSchemaReaders().get("Header Row Schema Reader")).newInstance();

			List<SchemaDef> schema = schemaReader.read("/root/vbox/data/stores.csv", "http://");

			return ow.writeValueAsString(schema);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getSchemaReaders/{name}", method = RequestMethod.GET)
	public String getSchemaReaders(@PathVariable String name) {
		try {
			return ow.writeValueAsString(DatalakeContext.getSchemaReaders());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return name;
	}

	@RequestMapping(value = "/getMetadata/{id}", method = RequestMethod.POST, produces = "application/json")
	public String getMetadata(@RequestBody Map<String, String> map) {
		try {
			List<Map<String, String>> data = DatalakeContext.getJobDao().getMetadata(map.get("key"));
			return ow.writeValueAsString(data);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getConnection/{name}/{fields}", method = RequestMethod.GET)
	public String getConnection(@PathVariable final String name, @PathVariable final String fields) {
		try {
			ConnectionConfig connection = DatalakeContext.getConnections().get("hana");
			return ow.writeValueAsString(MetadataBuilder.build(datalakeConnectionFactory,
					new AbstractMap.SimpleImmutableEntry<>(name, connection), fields));

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getConnections/{name}", method = RequestMethod.GET)
	public String getConnections(@PathVariable final String name) {

		ExecutorService executor = null;
		try {

			ConcurrentMap<String, ConnectionConfig> connections = DatalakeContext.getConnections();
			ThreadFactory tf = new ThreadFactoryBuilder().setNameFormat("edge-web-thread #%d")
					.setUncaughtExceptionHandler(new UncaughtExceptionHandler() {
						@Override
						public void uncaughtException(Thread t, Throwable e) {
							e.printStackTrace();
						}
					}).build();

			executor = Executors.newFixedThreadPool(connections.size(), tf);
			final List<Level> levels = new ArrayList<Level>();
			List<FutureTask<Level>> taskList = new ArrayList<FutureTask<Level>>(connections.size());

			for (final Map.Entry<String, ConnectionConfig> entry : connections.entrySet()) {

				FutureTask<Level> futureTask_1 = new FutureTask<Level>(new Callable<Level>() {
					@Override
					public Level call() {
						return MetadataBuilder.build(datalakeConnectionFactory, entry, null);
					}
				});
				taskList.add(futureTask_1);
				executor.execute(futureTask_1);
			}

			for (int j = 0; j < taskList.size(); j++) {
				FutureTask<Level> futureTask = taskList.get(j);
				Level level = futureTask.get();
				levels.add(level);
			}
			executor.shutdown();

			String json = ow.writeValueAsString(levels);

			return json;

		} catch (Exception e) {
			logger.info(Throwables.getStackTraceAsString(e));
			logger.info("Error ocuured " + e.getMessage());
			e.printStackTrace();
		} finally {
			executor.shutdown();
		}

		return null;
	}
}
