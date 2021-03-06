package com.walgreens.bigdata.demo.service.controller;

import java.io.FileInputStream;
import java.util.Properties;

public class DemoContext {

	static Properties properties;

	static {
		properties = new Properties();
		try {
			properties.load(new FileInputStream("/tmp/demo.properties"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getProperty(final String key) {
		return properties.getProperty(key);
	}
}
