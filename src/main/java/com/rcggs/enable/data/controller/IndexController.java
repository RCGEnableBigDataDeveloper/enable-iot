package com.rcggs.enable.data.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rcggs.datalake.connect.DatalakeConnectionFactory;
import com.rcggs.enable.data.service.StudentService;

@Controller
public class IndexController extends AbstractController {

	private static final Logger LOGGER = LoggerFactory.getLogger(StudentController.class);

	ObjectMapper mapper = new ObjectMapper();

	DatalakeConnectionFactory datalakeConnectionFactory = new DatalakeConnectionFactory();

	@Value("${example.message}")
	private String message;

	@Autowired
	private StudentService studentService;

	@RequestMapping(value = "/message", method = RequestMethod.GET)
	@ResponseBody
	public String getMessage() {
		return message;
	}

	@RequestMapping(value = "/students-ftl", method = RequestMethod.GET)
	public String loadStudentsFtl(Model m) {
		m.addAttribute("students", studentService.findAll());
		return "students-ftl";
	}

	@RequestMapping(value = "/weather", method = RequestMethod.GET)
	public String weather(Model m) {
		m.addAttribute("students", studentService.findAll());
		return "weather";
	}

	@RequestMapping(value = "/canvas", method = RequestMethod.GET)
	public String loadStudentsJsp(Model m) {
		m.addAttribute("students", studentService.findAll());
		return "canvas";
	}

	@RequestMapping(value = "/timeline", method = RequestMethod.GET)
	public String timeline(Model m) {
		return "customer/timeline";
	}

	@RequestMapping(value = "/stores", method = RequestMethod.GET)
	public String stores(Model m) {
		return "stores";
	}

	@RequestMapping(value = "/fleet", method = RequestMethod.GET)
	public String fleet(Model m) {
		return "fleet";
	}

	@RequestMapping(value = "/social", method = RequestMethod.GET)
	public String social(Model m) {
		return "social";
	}

	@RequestMapping(value = "/slider", method = RequestMethod.GET)
	public String slider(Model m) {
		return "customer/slider";
	}

	@RequestMapping(value = "/fleetslider", method = RequestMethod.GET)
	public String fleetslider(Model m) {
		return "fleet/slider";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(Model m) {
		return "test";
	}

	@RequestMapping(value = "/header", method = RequestMethod.GET)
	public String header(Model m) {
		return "header";
	}

	@RequestMapping(value = "/history", method = RequestMethod.GET)
	public String history(Model m) {
		return "history";
	}

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(Model m) {
		return "home";
	}

	@RequestMapping(value = "/homeMainTop", method = RequestMethod.GET)
	public String homeMainTop(Model m) {
		return "home/homeMainTop";
	}

	@RequestMapping(value = "/homeMainBottom", method = RequestMethod.GET)
	public String homeMainBottom(Model m) {
		return "home/homeMainBottom";
	}

	@RequestMapping(value = "/homeRightNavTop", method = RequestMethod.GET)
	public String homeRightNavTop(Model m) {
		return "home/homeRightNavTop";
	}

	@RequestMapping(value = "/beaconMainTop", method = RequestMethod.GET)
	public String beaconMainTop(Model m) {
		return "beacon/beaconMainTop";
	}

	@RequestMapping(value = "/beaconMainBottom", method = RequestMethod.GET)
	public String beaconMainBottom(Model m) {
		return "beacon/beaconMainBottom";
	}

	@RequestMapping(value = "/beaconRightNavTop", method = RequestMethod.GET)
	public String beaconRightNavTop(Model m) {
		return "beacon/beaconRightNavTop";
	}

	@RequestMapping(value = "/customerMainTop", method = RequestMethod.GET)
	public String customerMainTop(Model m) {
		return "customer/customerMainTop";
	}

	@RequestMapping(value = "/customerMainBottom", method = RequestMethod.GET)
	public String customerMainBottom(Model m) {
		return "customer/customerMainBottom";
	}

	@RequestMapping(value = "/customerRightNavTop", method = RequestMethod.GET)
	public String customerRightNavTop(Model m) {
		return "customer/customerRightNavTop";
	}

	@RequestMapping(value = "/fleetMainTop", method = RequestMethod.GET)
	public String fleetMainTop(Model m) {
		return "fleet/fleetMainTop";
	}

	@RequestMapping(value = "/fleetMainBottom", method = RequestMethod.GET)
	public String fleetMainBottom(Model m) {
		return "fleet/fleetMainBottom";
	}

	@RequestMapping(value = "/fleetRightNavTop", method = RequestMethod.GET)
	public String fleetRightNavTop(Model m) {
		return "fleet/fleetRightNavTop";
	}

	@RequestMapping(value = "/storesMainTop", method = RequestMethod.GET)
	public String storesMainTop(Model m) {
		return "stores/storesMainTop";
	}

	@RequestMapping(value = "/storesMainBottom", method = RequestMethod.GET)
	public String storesMainBottom(Model m) {
		return "stores/storesMainBottom";
	}

	@RequestMapping(value = "/storesRightNavTop", method = RequestMethod.GET)
	public String storesRightNavTop(Model m) {
		return "stores/storesRightNavTop";
	}

	@RequestMapping(value = "/socialMainTop", method = RequestMethod.GET)
	public String socialMainTop(Model m) {
		return "social/socialMainTop";
	}

	@RequestMapping(value = "/socialMainBottom", method = RequestMethod.GET)
	public String socialMainBottom(Model m) {
		return "social/socialMainBottom";
	}

	@RequestMapping(value = "/socialRightNavTop", method = RequestMethod.GET)
	public String socialRightNavTop(Model m) {
		return "social/socialRightNavTop";
	}

	@RequestMapping(value = "/salesMainTop", method = RequestMethod.GET)
	public String salesMainTop(Model m) {
		return "sales/salesMainTop";
	}

	@RequestMapping(value = "/salesMainBottom", method = RequestMethod.GET)
	public String salesMainBottom(Model m) {
		return "sales/salesMainBottom";
	}

	@RequestMapping(value = "/salesRightNavTop", method = RequestMethod.GET)
	public String salesRightNavTop(Model m) {
		return "sales/salesRightNavTop";
	}

	@RequestMapping(value = "/salesSlider", method = RequestMethod.GET)
	public String salesSlider(Model m) {
		return "sales/salesSlider";
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model m) {
		return "index";
	}
	
	@RequestMapping(value = "/healthMainTop", method = RequestMethod.GET)
	public String healthMainTop(Model m) {
		return "health/healthMainTop";
	}

	@RequestMapping(value = "/healthMainBottom", method = RequestMethod.GET)
	public String healthMainBottom(Model m) {
		return "health/healthMainBottom";
	}

	@RequestMapping(value = "/healthRightNavTop", method = RequestMethod.GET)
	public String healthRightNavTop(Model m) {
		return "health/healthRightNavTop";
	}
	
	@RequestMapping(value = "/healthSlider", method = RequestMethod.GET)
	public String healthSlider(Model m) {
		return "health/healthSlider";
	}
	
	@RequestMapping(value = "/salesCustomerSlider", method = RequestMethod.GET)
	public String salesCustomerSlider(Model m) {
		return "sales/salesCustomerSlider";
	}
}
