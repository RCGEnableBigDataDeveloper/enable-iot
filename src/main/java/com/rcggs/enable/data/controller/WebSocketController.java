package com.rcggs.enable.data.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.UUID;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rcggs.datalake.core.model.Message;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.SmsFactory;
import com.twilio.sdk.resource.instance.Sms;

import twitter4j.FilterQuery;
import twitter4j.HashtagEntity;
import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.StatusUpdate;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.User;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

@RestController
@RequestMapping(value = "/dataservice")
public class WebSocketController {

	final Logger logger = Logger.getLogger(getClass());

	static Queue queueA = new LinkedList();

	protected final static ObjectMapper mapper = new ObjectMapper();
	protected final static JsonFactory factory = mapper.getJsonFactory();

	protected final static ObjectWriter ow = new ObjectMapper().writer();
	private static TwitterStream twitterStream;

	public static void main(String[] args) {
		final ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true).setOAuthConsumerKey("o5oIH2HuZ75BOfmrft0p1oHbf")
				.setOAuthConsumerSecret("wQGf6gioURFXS9eYgN3JLCDdha2yoE7KR0BiK5EOTyqL6c5DoQ")
				.setOAuthAccessToken("766689871612305408-GHDne8TrfXS6vF0vuKCM6dnvnqnWBVj")
				.setOAuthAccessTokenSecret("qMWGykejMVOLiFjrohrZhUQTTvLcJJusuJpwCc0BBQO36");

		//final Configuration conf = cb.build();
//		Twitter twitterSender = new TwitterFactory(conf).getInstance();
//
//		try {
//			File file = new File("/tmp/logo.png");
//
//			StatusUpdate status = new StatusUpdate(
//					"@" + "zigdust2016" + " hello ref: " + UUID.randomUUID().toString().hashCode());
//			//status.setMedia(file);
//			twitterSender.updateStatus(status);
//			// twitterSender.updateStatus(
//			// "@" + "zigdust2016" + UUID.randomUUID().toString() + "XXXX");
//		} catch (TwitterException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		final Configuration conf = cb.build();

		
		StatusListener listener = new StatusListener() {
			public void onStatus(Status status) {
				
				System.out.println(status);

				String userId = Long.toString(status.getUser().getId());
				String displayname = status.getUser().getScreenName().replace("\n", "").replace("\r", "")
						.replace("|", "").replace(",", "");
				String tweet = status.getText().replace("\n", "").replace("\r", "").replace("|", "").replace(",",
						"");
				Date created = status.getCreatedAt();
				String fullTweet = status.toString().replace("\n", "").replace("\r", "").replace("|", "");
				String inReplyToScreenName = status.getInReplyToScreenName();
				double longitude = 0;
				double latitude = 0;

				if (status.getGeoLocation() != null) {
					longitude = status.getGeoLocation().getLongitude();
					latitude = status.getGeoLocation().getLatitude();
				}

				User user = status.getUser();

				String url = user.getProfileImageURL();

				Map<String, String> map = new HashMap<String, String>();
				map.put("user", userId);
				map.put("displayname", displayname);
				map.put("tweet", tweet);
				map.put("created", created.toString());
				map.put("fullTweet", fullTweet);
				map.put("img", url);
				map.put("lat", String.valueOf(latitude));
				map.put("lng", String.valueOf(longitude));

				queueA.add(map);

				Message m = new Message();

				try {
					m.setMessage(ow.writeValueAsString(map));

					HashtagEntity[] hashtags = status.getHashtagEntities();
					for (HashtagEntity hashtag : hashtags) {

						if (hashtag.getText() != null && hashtag.getText().contains("rcgstore")) {
							System.err.println("-->" + hashtag.getText() + " : " + displayname);

							twitterStream.shutdown();
							twitterStream.cleanUp();
							// twitterStream.clearListeners();

							Twitter twitterSender = new TwitterFactory(conf).getInstance();

							File file = new File("/tmp/logo.png");

							if (tweet.indexOf("stinks") != -1 || tweet.indexOf("sucks") != -1
									|| tweet.indexOf("bad") != -1) {
								System.out.println("bad tweet");
								StatusUpdate statusUpdate = new StatusUpdate(
										"@" + displayname + " our bad.. here's a coupon for Tide ref: "
												+ UUID.randomUUID().toString().hashCode());
								statusUpdate.setMedia(file);
								twitterSender.updateStatus(statusUpdate);
							} else {
								System.out.println("good tweet");
								StatusUpdate statusUpdate = new StatusUpdate(
										"@" + displayname + " thank you for your valuable comments. ref:"
												+ UUID.randomUUID().toString().hashCode());
								twitterSender.updateStatus(statusUpdate);
							}
						}
					}

				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}

			public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
			}

			public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
			}

			public void onException(Exception ex) {
				ex.printStackTrace();
			}

			public void onStallWarning(StallWarning warning) {
				System.out.println("Got stall warning:" + warning);
			}

			public void onScrubGeo(long userId, long upToStatusId) {
				System.out.println("Got scrub_geo event userId:" + userId + " upToStatusId:" + upToStatusId);
			}
		};
		
		TwitterStreamFactory twitterStreamFactory = new TwitterStreamFactory(conf);
		twitterStream = twitterStreamFactory.getInstance();

		twitterStream.addListener(listener);
		FilterQuery tweetFilterQuery = new FilterQuery();
		String[] filters = new String[] { "#rcgstore", "#walmart", "#target", "#walgreens", "#kmart",
				"#safeway", "#news" };

		// String[] filters = new String[] {};
		if (filters != null && filters.length > 0) {
			tweetFilterQuery.track(filters);
			twitterStream.filter(tweetFilterQuery);
		} else {
			twitterStream.sample();
			
		}

		
	}

	@RequestMapping(value = "/getTweets/{name}", method = RequestMethod.GET)
	public String getTweets(@PathVariable String name) {
		try {
			Map m = (Map) queueA.poll();
			System.err.println("==> " + m);
			return mapper.writeValueAsString(m);
		} catch (Exception e) {

			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/loadFile/{name}", method = RequestMethod.GET)
	public String loadFile(@PathVariable String name) throws IOException {

		File file = new File("/Users/eperler/Downloads/arcdata");

		StringBuilder builder = new StringBuilder();

		if (file.exists()) {
			FileInputStream fstream = new FileInputStream(file);
			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));

			String strLine;

			while ((strLine = br.readLine()) != null) {
				System.out.println(strLine);
				builder.append(strLine);
			}

			br.close();
			fstream.close();

			file.delete();
		}
		return builder.toString();
	}

	@RequestMapping(value = "/startTwitter/{name}", method = RequestMethod.GET)
	public String startTwitter(@PathVariable String name) {

		List<Map<String, Object>> metrics = new ArrayList<Map<String, Object>>(); // DatalakeContext.getMetricsDao().getMetrics(name);
		List<String> tweets = new ArrayList<>();
		final ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true).setOAuthConsumerKey("o5oIH2HuZ75BOfmrft0p1oHbf")
				.setOAuthConsumerSecret("wQGf6gioURFXS9eYgN3JLCDdha2yoE7KR0BiK5EOTyqL6c5DoQ")
				.setOAuthAccessToken("766689871612305408-GHDne8TrfXS6vF0vuKCM6dnvnqnWBVj")
				.setOAuthAccessTokenSecret("qMWGykejMVOLiFjrohrZhUQTTvLcJJusuJpwCc0BBQO36");

		final Configuration conf = cb.build();

		try {

			System.out.println("STARTING TWITTER FEED");

			StatusListener listener = new StatusListener() {
				public void onStatus(Status status) {

					String userId = Long.toString(status.getUser().getId());
					String displayname = status.getUser().getScreenName().replace("\n", "").replace("\r", "")
							.replace("|", "").replace(",", "");
					String tweet = status.getText().replace("\n", "").replace("\r", "").replace("|", "").replace(",",
							"");
					Date created = status.getCreatedAt();
					String fullTweet = status.toString().replace("\n", "").replace("\r", "").replace("|", "");
					String inReplyToScreenName = status.getInReplyToScreenName();
					double longitude = 0;
					double latitude = 0;

					if (status.getGeoLocation() != null) {
						longitude = status.getGeoLocation().getLongitude();
						latitude = status.getGeoLocation().getLatitude();
					}

					User user = status.getUser();

					logger.info(status);

					String url = user.getProfileImageURL();

					Map<String, String> map = new HashMap<String, String>();
					map.put("user", userId);
					map.put("displayname", displayname);
					map.put("tweet", tweet);
					map.put("created", created.toString());
					map.put("fullTweet", fullTweet);
					map.put("img", url);
					map.put("lat", String.valueOf(latitude));
					map.put("lng", String.valueOf(longitude));

					queueA.add(map);

					Message m = new Message();

					try {
						m.setMessage(ow.writeValueAsString(map));

						HashtagEntity[] hashtags = status.getHashtagEntities();
						for (HashtagEntity hashtag : hashtags) {

							if (hashtag.getText() != null && hashtag.getText().contains("rcgstore")) {
								System.err.println("-->" + hashtag.getText() + " : " + displayname);
								
								queueA.clear();
								queueA.add(map);

								twitterStream.shutdown();
								twitterStream.cleanUp();
								// twitterStream.clearListeners();

								Twitter twitterSender = new TwitterFactory(conf).getInstance();

								File file = new File("/tmp/logo.png");

								if (tweet.indexOf("stinks") != -1 || tweet.indexOf("sucks") != -1
										|| tweet.indexOf("bad") != -1) {
									System.out.println("bad tweet");
									StatusUpdate statusUpdate = new StatusUpdate(
											"@" + displayname + " our bad.. here's a coupon for Tide ref: "
													+ UUID.randomUUID().toString().hashCode());
									statusUpdate.setMedia(file);
									twitterSender.updateStatus(statusUpdate);
								} else {
									System.out.println("good tweet");
									StatusUpdate statusUpdate = new StatusUpdate(
											"@" + displayname + " thank you for your valuable comments. ref:"
													+ UUID.randomUUID().toString().hashCode());
									twitterSender.updateStatus(statusUpdate);
								}
							}
						}

					} catch (Exception e1) {
						e1.printStackTrace();
					}
				}

				public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
				}

				public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
				}

				public void onException(Exception ex) {
					ex.printStackTrace();
				}

				public void onStallWarning(StallWarning warning) {
					System.out.println("Got stall warning:" + warning);
				}

				public void onScrubGeo(long userId, long upToStatusId) {
					System.out.println("Got scrub_geo event userId:" + userId + " upToStatusId:" + upToStatusId);
				}
			};

			TwitterStreamFactory twitterStreamFactory = new TwitterStreamFactory(conf);
			twitterStream = twitterStreamFactory.getInstance();

			twitterStream.addListener(listener);
			FilterQuery tweetFilterQuery = new FilterQuery();
			String[] filters = new String[] { "#rcgstore", "#walmart", "#target", "#walgreens", "#kmart",
					"#safeway", "#news" };

			// String[] filters = new String[] {};
			if (filters != null && filters.length > 0) {
				tweetFilterQuery.track(filters);
				twitterStream.filter(tweetFilterQuery);
			} else {
				twitterStream.sample();
				Thread.sleep(500);
			}

			return ow.writeValueAsString(metrics);
		} catch (Exception e1) {
			e1.printStackTrace();
		}

		return null;
	}

	public static void main1(String[] args) throws TwilioRestException {
		TwilioRestClient client = new TwilioRestClient("ACe105a9b5534910bb9529b2b3ced43eb3",
				"da54a079b1f92ea2fcb69f86f006e700");
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("Body",
				String.format("Alert from local0 skipped  fields inserting into type ")));
		params.add(new BasicNameValuePair("To", "224-532-3769"));
		params.add(new BasicNameValuePair("From", "+18472216218"));
		SmsFactory smsFactory = client.getAccount().getSmsFactory();
		Sms sms = smsFactory.create(params);
		System.out.println("sms status : " + sms.getStatus());
	}
	
}