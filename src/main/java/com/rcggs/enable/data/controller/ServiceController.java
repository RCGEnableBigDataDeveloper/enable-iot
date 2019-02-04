package com.rcggs.enable.data.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.security.PrivilegedExceptionAction;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.Set;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.security.UserGroupInformation;
//import org.apache.phoenix.jdbc.PhoenixDriver;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
//import org.kududb.client.KuduClient;
//import org.kududb.client.KuduScanner;
//import org.kududb.client.KuduTable;
//import org.kududb.client.RowResult;
//import org.kududb.client.RowResultIterator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.rcggs.engine.spark.stream.CreditCardNumberGenerator;
import com.rcggs.engine.spark.stream.DataGenerator;
import com.walgreens.bigdata.demo.service.controller.DemoContext;

@RestController
@RequestMapping(value = "/dataservice")
public class ServiceController {

	final Logger LOG = LoggerFactory.getLogger(getClass());
	ObjectWriter ow = new ObjectMapper().writer();
	ObjectMapper mapper = new ObjectMapper();
	JsonFactory factory = mapper.getJsonFactory();

	CreditCardNumberGenerator g = new CreditCardNumberGenerator();

	DecimalFormat dFormat = new DecimalFormat("####,###,###.00");
	Random rand = new Random();
	final static RestTemplate restTemplate = new RestTemplate();

	// private static final Driver phoenixDriver = new PhoenixDriver();

	SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");

	String salesDbUrl = DemoContext.getProperty("demo.sales.db");
	// KuduClient client = new KuduClient.KuduClientBuilder(salesDbUrl).build();

	@RequestMapping(value = "/notify/{name}", method = RequestMethod.GET)
	public String notify(@PathVariable String name) {
		// NotificationService<String> service = new
		// SMSNotificationService<String>();
		// service.notify(name, DemoContext.getProperty("demo.sms.number"));
		return null;
	}

	@RequestMapping(value = "/echo", method = RequestMethod.GET)
	public String echo() {
		return null;
	}

	@RequestMapping(value = "/news/{name}", method = RequestMethod.GET)
	public String news(@PathVariable String name) {
		BufferedReader br = null;
		Appendable buffer = new StringBuilder();
		try {
			URL url = new URL("https://rss.upi.com/news/tn_int.rss");
			URLConnection conn = url.openConnection();
			br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String inputLine;

			while ((inputLine = br.readLine()) != null) {
				System.out.println(inputLine);
				buffer.append(inputLine);
			}
			br.close();

			Thread.sleep(1000);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return buffer.toString();
	}

	@RequestMapping(value = "/sendMail", method = RequestMethod.POST, consumes = "application/json")
	public String sendMail(@RequestBody Object data) {

		StringBuilder b = new StringBuilder();

		for (String s : data.toString().split(",")) {
			b.append(s.trim() + "\n");
		}

		System.out.println(b.toString());
		Properties props = new Properties();

		/*
		 * Specifies the IP address of your default mail server for e.g if you
		 * are using gmail server as an email sever you will pass smtp.gmail.com
		 * as value of mail.smtp host. As shown here in the code. Change
		 * accordingly, if your email id is not a gmail id
		 */
		props.put("mail.smtp.host", "smtp.gmail.com");
		// below mentioned mail.smtp.port is optional
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");

		/*
		 * Pass Properties object(props) and Authenticator object for
		 * authentication to Session instance
		 */

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("eperler@mapr.com", "123Reset!");
			}
		});

		try {

			/*
			 * Create an instance of MimeMessage, it accept MIME types and
			 * headers
			 */

			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress("eperler@mapr.com"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress("eric.perler@rcggs.com"));
			message.setSubject("Incident created " + System.currentTimeMillis());
			message.setText(b.toString().replaceAll("[{}]", " "));

			Transport.send(message);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "{}";

	}

	@RequestMapping(value = "/getUserPrefs/{name}", method = RequestMethod.GET)
	public String getUserPrefs(@PathVariable String name)
			throws JsonGenerationException, JsonMappingException, IOException {

		Map<String, String> userData = new LinkedHashMap<String, String>();

		return ow.writeValueAsString(userData);
	}

	@RequestMapping(value = "/getInventoryLevel/{name}", method = RequestMethod.GET)
	public Set<String> getInventoryLevel(@PathVariable String name) {

		try {
			return DataGenerator.getCardActions("customer");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getHealthData/{name}", method = RequestMethod.GET)
	public Set<String> getHealthData(@PathVariable String name) {

		try {
			return DataGenerator.getCardActions("health");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value = "/getFleetData/{name}", method = RequestMethod.GET)
	public Set<String> getFleetData(@PathVariable String name) {

		try {
			return DataGenerator.getCardActions("fleet");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// String KUDU_MASTER = System.getProperty("kuduMaster",
	// "local1.rcggs.com");

	@RequestMapping(value = "/getTimeline/{name}", method = RequestMethod.GET)
	public String getTimeline(@PathVariable String name) {
		try {
			String s = IOUtils.toString(getClass().getResource("/jfk.xml"));
			System.err.println(s);
			return s;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getStoresSales/{name}", method = RequestMethod.GET)
	public String getStoresSales(@PathVariable String name) {

		String tableName = "ordersummary";
		Connection conn = null;
		double totalSales = 100000.00;

		Map<String, String> salesData = new LinkedHashMap<String, String>();
		try {

			if (DemoContext.getProperty("demo.distribution").equals("cdh")) {

				// KuduTable table = client.openTable(tableName);
				//
				// List<String> projectColumns = new ArrayList<>(1);
				// projectColumns.add("storeid");
				// projectColumns.add("sales");
				// KuduScanner scanner =
				// client.newScannerBuilder(table).setProjectedColumnNames(projectColumns).build();
				//
				// while (scanner.hasMoreRows()) {
				// RowResultIterator results = scanner.nextRows();
				// while (results.hasNext()) {
				// RowResult result = results.next();
				// salesData.put("store" + result.getInt(0),
				// String.valueOf(result.getInt(1)));
				// totalSales += result.getInt(1);
				//
				// }
				// }
			} else {

				// conn = phoenixDriver.connect(salesDbUrl, new Properties());
				//
				// Statement st = conn.createStatement();
				// java.sql.ResultSet rs = st.executeQuery("select * from
				// ORDERSUMMARY");
				// while (rs.next()) {
				// salesData.put("store" + rs.getString(1),
				// String.valueOf(rs.getString(2)));
				// totalSales += Integer.parseInt(rs.getString(1));
				// }
			}

			String s = IOUtils.toString(getClass().getResourceAsStream("/stores.csv"));
			String[] lines = s.split("\n");
			for (String line : lines) {
				// System.out.println(line);
			}

			salesData.put("storetotalsales", dFormat.format(3234234));
			salesData.put("storetotalreturns", dFormat.format(234234 / 12));
			salesData.put("storetotalsalesamount", dFormat.format(234234 / 50));
			salesData.put("storetotalreturnamount", dFormat.format(10 + (100000 - 10) * rand.nextDouble()));
			salesData.put("storetotalweek", dFormat.format(10 + (100000 - 10) * rand.nextDouble()));
			salesData.put("storetotalmonth", dFormat.format(10 + (100000 - 10) * rand.nextDouble()));
			salesData.put("storetotalyear", dFormat.format(10 + (100000 - 10) * rand.nextDouble()));
			salesData.put("id", "store5");
			salesData.put("store" + rand.nextInt(49), "3425");

			// System.err.println("kudu query took : " +
			// (System.currentTimeMillis() - time));
			return ow.writeValueAsString(salesData);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// try {
			// conn.close();
			// } catch (SQLException e) {
			// // TODO Auto-generated catch block
			// e.printStackTrace();
			// }
		}

		return null;
	}

	@RequestMapping(value = "/getForecast/{name}", method = RequestMethod.GET)
	public String getForecast(@PathVariable String name) {
		try {

			Appendable buffer = new StringBuilder();
			buffer.append("date,delay,distance,origin,destination\n");
			for (int i = 0; i < 1000; i++) {

				String month = String.format("%02d", rand.nextInt(12) + 1);
				String date = String.format("%02d", rand.nextInt(30) + 1);
				String hour = String.format("%02d", rand.nextInt(12) + 1);
				String minute = String.format("%02d", rand.nextInt(60) + 1);

				String delay = String.format("%02d", rand.nextInt(60) + 1);
				String distance = String.format("%02d", rand.nextInt(500) + 1);

				String[] states = new String[] { "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "US", "FL", "GA", "HA", "ID",
						"IL", "IN", "IA", "KA", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
						"NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
						"VT", "VA", "WA", "WV", "WI" };

				String state = states[rand.nextInt(states.length)];
				buffer.append(
						month + date + hour + minute + "," + delay + "," + distance + "," + state + "," + state + "\n");
			}

			return buffer.toString();

		} catch (IOException e) {
			e.printStackTrace();
		}
		return name;
	}

	@RequestMapping(value = "/getStores/{name}", method = RequestMethod.GET)
	public String getStores(@PathVariable String name) {
		Connection con = null;
		List<Map<String, String>> list;
		Map<String, String> map;

		final String url = DemoContext.getProperty("demo.stores.db");

		try {

			Class.forName("org.apache.hive.jdbc.HiveDriver");

			if (DemoContext.getProperty("demo.distribution").equals("hdp")) {

				// conn =
				// phoenixDriver.connect("jdbc:phoenix:node1.rcggs.com:2181:/hbase-unsecure",
				// new Properties());
				// conn = DriverManager.getConnection(url);

			} else {

				Class.forName("org.apache.hive.jdbc.HiveDriver");
				// conn =
				// DriverManager.getConnection("jdbc:hive2://local1.rcggs.com:21050/;auth=noSasl");
				if (DemoContext.getProperty("demo.kerberos.enabled").equals("true")) {

					Configuration conf = new Configuration();
					conf.set("hadoop.security.authentication", "Kerberos");
					UserGroupInformation.setConfiguration(conf);
					UserGroupInformation ugi = null;
					try {

						ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI("cloudera-service/admin@RCGGS",
								"/etc/security/keytabs/cloudera-service.keytab");
						ugi.doAs(new PrivilegedExceptionAction<Void>() {
							public Void run() throws Exception {
								conn = DriverManager.getConnection(url);
								return null;
							}
						});
					} catch (IOException | InterruptedException e) {
						e.printStackTrace();
					}
				} else {
					// conn = DriverManager.getConnection(url);
				}

			}

			list = new ArrayList<Map<String, String>>();
			// Statement st = conn.createStatement();
			//
			// java.sql.ResultSet rs = st.executeQuery(
			// "select StoreID, StoreAddress, StoreAddress, StoreCity,
			// StoreState, StorePostalCode, StoreLat, StoreLong from stores "
			// + (name.equals("ALL") ? "" : "where StoreState='" + name + "'"));

			// while (rs.next()) {

			String s = IOUtils.toString(getClass().getResourceAsStream("/stores.csv"));
			String[] lines = s.split("\n");
			for (String line : lines) {
				map = new HashMap<String, String>();
				String[] data = line.split(",");
				map.put("id", data[0]);
				map.put("name", data[1]);
				map.put("address", data[2]);
				map.put("city", data[3]);
				map.put("state", data[4]);
				map.put("zip", data[5]);
				map.put("lat", data[6]);
				map.put("lng", data[7]);
				map.put("card", g.generate("" + (new Random().nextInt(9999 - 1000) + 1000), 16));
				map.put("store", DataGenerator.getRandomStore());
				map.put("sale", dFormat.format(234234 / 50));
				list.add(map);
			}

			// }

			return ow.writeValueAsString(list);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn != null)
					conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	Connection conn = null;
	Connection conn1 = null;

	@RequestMapping(value = "/getProducts/{name}", method = RequestMethod.GET)
	public String getProducts(@PathVariable String name) {

		List<Map<String, String>> list;
		Map<String, String> map;
		try {

			Class.forName("org.apache.hive.jdbc.HiveDriver");

			final String url = DemoContext.getProperty("demo.products.db");

			if ((DemoContext.getProperty("demo.distribution").equals("cdh"))) {

				if ((DemoContext.getProperty("demo.kerberos.enabled").equals("true"))) {

					Configuration conf = new Configuration();
					conf.set("hadoop.security.authentication", "Kerberos");
					UserGroupInformation.setConfiguration(conf);
					UserGroupInformation ugi = null;
					try {

						ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI("cloudera-service/admin@RCGGS",
								"/etc/security/keytabs/cloudera-service.keytab");
						ugi.doAs(new PrivilegedExceptionAction<Void>() {
							public Void run() throws Exception {
								conn1 = DriverManager.getConnection(url);
								return null;
							}
						});
					} catch (IOException | InterruptedException e) {
						e.printStackTrace();
					}
				} else {
					conn1 = DriverManager.getConnection(url);
				}

				list = new ArrayList<Map<String, String>>();
				Statement st = conn1.createStatement();
				java.sql.ResultSet rs = st.executeQuery(
						"select productid, productname, unitprice from products group by productname, productid, unitprice order by productname");
				while (rs.next()) {

					String nm = rs.getString(2);

					map = new HashMap<String, String>();
					map.put("id", String.valueOf(rs.getInt(1)));
					map.put("name", nm.replaceAll("\"", ""));

					double price = rs.getDouble(3);
					if (price > 100)
						price = price / 100;

					map.put("price", "$" + dFormat.format(price));
					list.add(map);
				}

			} else {
				// conn1 =
				// phoenixDriver.connect("jdbc:phoenix:node1.rcggs.com:2181:/hbase-unsecure",
				// new Properties());
				conn1 = DriverManager.getConnection(url);

				list = new ArrayList<Map<String, String>>();
				Statement st = conn1.createStatement();
				java.sql.ResultSet rs = st.executeQuery("select productid, productname, unitprice from products");
				while (rs.next()) {

					String nm = rs.getString(2);

					map = new HashMap<String, String>();
					map.put("id", rs.getString(1));
					map.put("name", nm);
					map.put("price", "$" + rs.getString(3));
					list.add(map);
				}

			}

			return ow.writeValueAsString(list);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn1 != null)
					conn1.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@RequestMapping(value = "/logger/{name}", method = RequestMethod.GET)
	public String logger(@PathVariable String name) {

		StringBuilder s = new StringBuilder();
		try {
			Process p = Runtime.getRuntime().exec("tail -20 /tmp/out.log");
			java.io.BufferedReader input = new java.io.BufferedReader(
					new java.io.InputStreamReader(p.getInputStream()));
			String line = null;

			while ((line = input.readLine()) != null) {
				s.append(line + '\n');
			}
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return s.toString();

	}

	class Pair {
		String id;
		String value;
		String data;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getData() {
			return data;
		}

		public void setData(String data) {
			this.data = data;
		}
	}

	List<Pair> combineListsIntoOrderedMap(List<String> keys, List<String> values) {

		List<Pair> pairs = new ArrayList<Pair>();

		if (keys.size() != values.size() && keys.size() > 0) {
			Pair pair = new Pair();
			pair.setId(keys.get(0));
			pair.setValue(values.get(0));
			pairs.add(pair);

		} else {
			for (int i = 0; i < (keys.size() == 1 ? 1 : 2); i++) {
				Pair pair = new Pair();
				pair.setId(keys.get(i));
				pair.setValue(values.get(i));
				pairs.add(pair);

			}
		}
		return pairs;
	}

}