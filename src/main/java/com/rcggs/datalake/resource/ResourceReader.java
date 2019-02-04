package com.rcggs.datalake.resource;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

//import org.apache.hadoop.conf.Configuration;
//import org.apache.hadoop.fs.FileSystem;
//import org.apache.hadoop.fs.Path;

import com.google.common.base.CharMatcher;

public abstract class ResourceReader<T> {

	protected static CharMatcher matcher;

	protected ResourceReader() {
		matcher = CharMatcher.inRange('a', 'z').or(CharMatcher.inRange('A', 'Z')).or(CharMatcher.inRange('0', '9').or(CharMatcher.is('_'))).precomputed();
	}

	public abstract List<T> read(final String path, final String type);

	protected String clean(final Object string) {
		String value = String.valueOf(string).replaceAll(" ", "_");
		return matcher.retainFrom(value);
	}

	protected InputStream loadResource(final String path, final String type) {
		InputStream is = null;
		try {
			if (type.equals(ResourceType.FILE.text)) {
				File file = new File(path);
				is = new FileInputStream(file);
			} else if (path.equals(ResourceType.CLASSPATH.text)) {
				is = getClass().getResourceAsStream(path);
			} else if (path.equals(ResourceType.HTTP.text) || path.startsWith(ResourceType.HTTPS.text)) {
				URL url = new URL(path);
				is = new BufferedInputStream(url.openStream());
			} else if (path.startsWith(ResourceType.HDFS.text)) {
//				FileSystem fileSystem = FileSystem.get(new Configuration());
//				is = fileSystem.open(new Path(path));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return is;
	}
}
