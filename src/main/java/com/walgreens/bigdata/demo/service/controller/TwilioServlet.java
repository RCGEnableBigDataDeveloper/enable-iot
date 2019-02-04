package com.walgreens.bigdata.demo.service.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.rcggs.datalake.configuration.DatalakeContext;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.twilio.sdk.verbs.Message;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.TwiMLResponse;

/**
 * Servlet implementation class TwilioServlet
 */
@WebServlet("/TwilioServlet")
public class TwilioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public TwilioServlet() {
		super();
	}

	public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line;
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		String data = buffer.toString();

		String[] params = data.split("&");
		for (String param : params) {

			String[] values = param.split("=");
			if (values[0].equals("Body")) {
				System.out.println("-->" + values[1]);
			}
		}
		
		Client client = Client.create();
		WebResource webResource = client.resource("http://localhost:8080/valuemart-web/service/getMetrics/nn");
		ClientResponse res = webResource.type("application/json").get(ClientResponse.class);

		TwiMLResponse twiml = new TwiMLResponse();
		Message message = new Message("Route Changed");
		try {
			twiml.append(message);
		} catch (TwiMLException e) {
			e.printStackTrace();
		}

		response.setContentType("application/xml");
		response.getWriter().print(twiml.toXML());
	}

}
