package com.walgreens.bigdata.demo.service.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

public class RecordGenerator {

	final static Random rand = new Random();

	public static void main(String... args) throws Exception {
		String[] products = getLines("/data/products.csv");
		String[] customers = getLines("/data/customers.csv");
		String[] stores = getLines("/data/stores.csv");

		int seq = 0;
		for (int i = 0; i < 100; i++) {

			try {

				int randomStore = rand.nextInt(stores.length - 0) + 0;
				int randomCustomer = rand.nextInt(customers.length - 0) + 0;
				int numproducts = rand.nextInt(12 - 0) + 0;

				// System.out.println(randomStore);

				String record = (i + "," + randomCustomer + "," + randomStore + "," + randomDate() + "\n");

				write("/tmp/orders.csv", record);

				for (int j = 0; j < numproducts; j++) {
					int randomProduct = rand.nextInt(products.length - 0) + 0;
					seq++;
					String orderitem = seq + "," + (rand.nextInt(100 - 0) + 0) + "," + products[randomProduct].split(",")[0] + ","
							+ products[randomProduct].split(",")[2] + "," + 1+ "\n";
					// write("/tmp/orderitems.csv", orderitem);
				}

				seq++;

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public static void generateStores() throws Exception {

		String[] data = getLines("/sample/stores.dat");

		for (int i = 0; i < data.length; i++) {

			String[] values = data[i].split(",");
			String record = (i + "," + values[0] + "," + values[1] + "," + values[2] + "," + values[3] + ","
					+ values[4].replaceAll("\n", "").trim() + "\n");

			write("/tmp/stores.txt", record);
		}
	}

	public static void generateProducts() throws Exception {

		String[] data = getLines("/sample/products.txt");

		for (int i = 0; i < data.length; i++) {

			try {

				String[] values = data[i].split(",");
				String record = (i + "," + values[0].replaceAll("\n", "").trim() + "," + rand.nextInt(350) + "," + rand.nextInt(100)
						+ "," + rand.nextInt(100) + "," + 10 + "," + 0 + "\n");

				write("/tmp/products.txt", record);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	public static void generateUsers() throws Exception {

		String[] names = getLines("/sample/stores.txt");

		String[] data = getLines("/sample/products.csv");

		for (int i = 0; i < data.length; i++) {

			try {

				String[] values = data[i].split(",");
				String record = (i + ",," + names[i].replaceAll("\n", "").trim() + "," + values[0] + "," + values[1] + "," + values[2]
						+ "," + values[3] + "," + values[4] + "," + values[5].replaceAll("\n", "").trim() + ",\n");

				write("/tmp/customers.csv", record);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	public static void generateOrders() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] stores = getLines("/sample/stores.dat");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		for (int i = 0; i < 1000000; i++) {

			try {

				int randomStore = rand.nextInt(stores.length - 0) + 0;
				int randomCustomer = rand.nextInt(names.length - 0) + 0;

				// System.out.println(randomStore);

				String record = (i + "," + randomCustomer + "," + randomStore + "," + randomDate() + "\n");

				write("/tmp/orderdetails.csv", record);

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	public static void generateOrdersItems() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] products = getLines("/sample/products.txt");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		int cnt = 0;

		for (int i = 0; i < 1000000; i++) {

			try {

				int randomCustomer = rand.nextInt(names.length - 0) + 0;
				int randomOrder = rand.nextInt(1000000 - 0) + 0;

				int randomNumProducts = rand.nextInt(10 - 1) + 1;

				for (int j = 0; j < randomNumProducts; j++) {
					double randomPrice = .99 + (399.99 - .99) * rand.nextDouble();
					int randomProducts = rand.nextInt(products.length - 0) + 0;
					int randomQuantity = rand.nextInt(5 - 1) + 1;
					List<Object> record = new ArrayList<Object>();
					record.add(cnt++);
					record.add(randomOrder);
					record.add(randomProducts);
					record.add(String.format("%.2f", randomPrice));
					record.add(randomQuantity);
					write("/tmp/orderitems.csv", StringUtils.join(record, ",") + "\n");

				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public static void generateInventory() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] products = getLines("/sample/products.txt");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		int cnt = 0;

		for (int i = 0; i < 51; i++) {

			try {

				for (int j = 0; j < 1856; j++) {
					int randomQuantity = rand.nextInt(50 - 1) + 1;
					System.out.println(cnt++ + "," + i + "," + j + "," + randomQuantity);
					write("/tmp/inventory.csv", cnt++ + "," + i + "," + j + "," + randomQuantity + "\n");
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	static void insert(String query) throws Exception {
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		String userName = "sa";
		String password = "root";
		String url = "jdbc:sqlserver://localhost:1433;databaseName=userdata;";
		Connection con = DriverManager.getConnection(url, userName, password);
		Statement s1 = con.createStatement();
		System.out.println(query);
		s1.executeUpdate(query);
		// while(rs.next()){
		// System.out.println(rs.getString(1));
		// }
	}

	static String[] getLines(final String name) throws IOException, URISyntaxException {
		String data = IOUtils.toString(RecordGenerator.class.getResourceAsStream(name));
		return data.split("\n");
	}

	static void write(final String path, final String content) {
		Writer writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path, true), "utf-8"));
			writer.write(content);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			try {
				writer.close();
			} catch (Exception ex) {
			}
		}
	}

	static String randomDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

		Date randomDate = new Date(getRandomTimeBetweenTwoDates());
		return dateFormat.format(randomDate);

	}

	private static long getRandomTimeBetweenTwoDates() {
		long beginTime = Timestamp.valueOf("2013-01-01 00:00:00").getTime();
		long endTime = Timestamp.valueOf("2008-12-31 00:58:00").getTime();
		long diff = endTime - beginTime + 1;
		return beginTime + (long) (Math.random() * diff);
	}

	static String[] states = new String[] { "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
			"KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
			"OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" };

}
