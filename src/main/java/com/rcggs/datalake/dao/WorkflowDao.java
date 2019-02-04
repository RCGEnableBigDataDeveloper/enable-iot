package com.rcggs.datalake.dao;

import java.io.IOException;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Throwables;
import com.rcggs.datalake.core.model.LevelBuilder;

public class WorkflowDao extends AbstractDao {

	final Logger logger = LoggerFactory.getLogger(getClass());

	final static ObjectWriter ow = new ObjectMapper().writer();
	final static ObjectMapper mapper = new ObjectMapper();

	String toJson(final Object data) {
		try {
			return ow.writeValueAsString(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	Map<String, String> getData(final String query, final String name) {
		Connection conn = null;
		PreparedStatement preparedStmt = null;
		ResultSet rs = null;
		Map<String, String> data = new HashMap<String, String>();
		try {
			conn = getConnection();
			preparedStmt = conn.prepareStatement(query);

			System.err.println(query);
			preparedStmt.setString(1, name);
			rs = preparedStmt.executeQuery();
			while (rs.next()) {
				data.put("id", rs.getString(1));
				data.put("layout", rs.getString(2));
				data.put("model", rs.getString(3));
			}
			return data;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(rs, preparedStmt, conn);
		}
		return null;
	}

	public String openModel(final String name) {
		String query = "select id, model from dl_wf_layout where name = ?";
		return toJson(getData(query, name));
	}

	public String openWorkflow(final String name) {
		String query = "select id, layout, model from dl_wf_layout where name = ?";
		return toJson(getData(query, name));
	}

	public int updateWorkflow(String name) {
		String query = "update dl_wf_layout set modified = ?, layout= ?, model = ? where name = ?";
		Connection conn = null;
		PreparedStatement preparedStmt = null;
		try {
			conn = getConnection();
			name = URLDecoder.decode(name, "UTF-8");
			JsonNode data = mapper.readTree(name);
			preparedStmt = conn.prepareStatement(query);
			preparedStmt.setDate(1, new Date(System.currentTimeMillis()));
			preparedStmt.setString(2, data.get("data").getTextValue());
			preparedStmt.setString(3, data.get("model").getTextValue());
			preparedStmt.setString(4, data.get("filename").getTextValue());
			return preparedStmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(null, preparedStmt, conn);
		}

		return 0;
	}

	public int saveWorkflowFolder(String name) {

		Connection conn = null;
		PreparedStatement preparedStmt = null;
		try {

			name = URLDecoder.decode(name, "UTF-8");
			JsonNode data = mapper.readTree(name);

			conn = getConnection();
			String query = "insert into dl_wf_layout_fldr(id, name, parent_fldr_id)values(?,?,?)";
			preparedStmt = conn.prepareStatement(query);
			preparedStmt.setString(1, UUID.randomUUID().toString());
			preparedStmt.setString(2, data.get("text").getTextValue());

			System.err.println(data.get("id").getTextValue());

			if (data.get("id").getTextValue().equals("0"))
				preparedStmt.setString(3, null);
			else
				preparedStmt.setString(3, data.get("id").getTextValue());

			return preparedStmt.executeUpdate();

		} catch (SQLException | IOException e) {
			e.printStackTrace();
		} finally {
			close(null, preparedStmt, conn);
		}

		return 0;
	}

	public int saveWorkflow(String name) {

		Connection conn = null;
		PreparedStatement preparedStmt = null;
		try {

			conn = getConnection();
			name = name.replaceAll("%", "");
			name = URLDecoder.decode(name, "UTF-8");
			JsonNode data = mapper.readTree(name);
			Map<String, String> result = getData(
					"select id, layout, model from dl_wf_layout where name = ? and parent_fldr_id='"
							+ data.get("parent_fldr_id").getTextValue() + "'",
					data.get("filename").getTextValue());

			if (result.size() > 0) {
				return 0;
			}

			String query = "insert into dl_wf_layout(id, name, owner, grp, active, created, modified, parent_fldr_id, layout, model)values(?,?,?,?,?,?,?,?,?,?)";
			preparedStmt = conn.prepareStatement(query);
			preparedStmt.setString(1, UUID.randomUUID().toString());
			preparedStmt.setString(2, data.get("filename").getTextValue());
			preparedStmt.setString(3, data.get("parent_fldr_id").getTextValue());
			preparedStmt.setString(4, data.get("grp").getTextValue());
			preparedStmt.setBoolean(5, true);
			preparedStmt.setDate(6, new Date(System.currentTimeMillis()));
			preparedStmt.setDate(7, new Date(System.currentTimeMillis()));
			preparedStmt.setString(8, data.get("parent_fldr_id").getTextValue());
			preparedStmt.setString(9, data.get("data").getTextValue());

			preparedStmt.setString(10, (data.get("model") != null) ? data.get("model").getTextValue() : "");

			return preparedStmt.executeUpdate();

		} catch (Exception e) {
			logger.info(Throwables.getStackTraceAsString(e));
			e.printStackTrace();
		} finally {
			close(null, preparedStmt, conn);
		}

		return -1;
	}

	public String buildLevels() {
		try {
			String parentQry = "select * from dl_wf_layout_fldr order by seq";
			String childQry = "select * from dl_wf_layout where parent_fldr_id=";
			LevelBuilder v = new LevelBuilder();
			return (v.build(parentQry, childQry));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getWorkflow(final String id) {
		String query = "select model from dl_wf_layout where id = ?";
		return toJson(getData(query, id));
	}

}
