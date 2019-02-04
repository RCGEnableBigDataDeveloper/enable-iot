package com.rcggs.datalake.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.base.Throwables;
import org.apache.log4j.Logger;


import com.rcggs.datalake.pool.DataSource;

public class MetadataDao extends AbstractDao {

		private final Logger logger = Logger.getLogger(getClass());


	public List<Map<String, String>> getServices(final String name) {

		String query = "select id, name, description, tags, route from dl_service";
		List<Map<String, String>> options = new ArrayList<Map<String, String>>();
		Connection connection = null;
		Statement statement = null;
		ResultSet rs = null;
		try {
			connection = DataSource.getConnection();
			statement = connection.createStatement();
			rs = statement.executeQuery(query);
			while (rs.next()) {
				Map<String, String> data = new HashMap<String, String>();
				data.put("id", rs.getString(1));
				data.put("name", rs.getString(2));
				data.put("description", rs.getString(3));
				data.put("tags", rs.getString(4));
				data.put("route", rs.getString(5));

				options.add(data);
			}
		} catch (SQLException e) {
						logger.error(e.getMessage());
			logger.error(Throwables.getStackTraceAsString(e));
			e.printStackTrace();
		} finally {
			close(rs, statement, connection);
		}

		return options;
	}

	public List<Map<String, String>> getOptions(final String name) {

		logger.info("getting options for "  + name);



		String query = "select option_type, name, description, defaultvalue, editor from dl_options where option_type='" + name + "' or option_type='general' and not option_type='plugin' order by name";
		List<Map<String, String>> options = new ArrayList<Map<String, String>>();
		Connection connection = null;
		Statement statement = null;
		ResultSet rs = null;
		try {

			connection = DataSource.getConnection();
			statement = connection.createStatement();
			rs = statement.executeQuery(query);
			while (rs.next()) {
				Map<String, String> data = new HashMap<String, String>();
				data.put("type", rs.getString(1));
				data.put("name", rs.getString(2));
				data.put("description", rs.getString(3));
				data.put("value", rs.getString(4));
				data.put("editor", rs.getString(5));

				options.add(data);
			}
		} catch (SQLException e) {
									logger.error(e.getMessage());
						logger.error(Throwables.getStackTraceAsString(e));
			e.printStackTrace();
			e.printStackTrace();
		} finally {
			close(rs, statement, connection);
		}

		return options;
	}
}
