package com.walgreens.bigdata.demo.service.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

	@Autowired
	private TaskScheduler scheduler = new ConcurrentTaskScheduler();
	private List<Stock> stockPrices = new ArrayList<Stock>();
	private Random rand = new Random(System.currentTimeMillis());

	/**
	 * Iterates stock list, update the price by randomly choosing a positive or negative percentage, then broadcast it
	 * to all subscribing clients
	 */


	/**
	 * Invoked after bean creation is complete, this method will schedule updatePriceAndBroacast every 1 second
	 */
	/**
	 * Handler to add one stock
	 */

	/**
	 * Handler to remove all stocks
	 */

	/**
	 * Serve the main page, view will resolve to /WEB-INF/home.jsp
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "home";
	}

}