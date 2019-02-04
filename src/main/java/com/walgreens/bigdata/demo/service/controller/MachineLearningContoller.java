//package com.walgreens.bigdata.demo.service.controller;
//
//import java.io.BufferedWriter;
//import java.io.File;
//import java.io.FileWriter;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
//import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
//import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
//import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
//import org.apache.mahout.cf.taste.impl.similarity.LogLikelihoodSimilarity;
//import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
//import org.apache.mahout.cf.taste.model.DataModel;
//import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
//import org.apache.mahout.cf.taste.recommender.ItemBasedRecommender;
//import org.apache.mahout.cf.taste.recommender.RecommendedItem;
//import org.apache.mahout.cf.taste.recommender.Recommender;
//import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
//import org.apache.mahout.cf.taste.similarity.UserSimilarity;
//
//public class MachineLearningContoller {
//
//	public static List<String> recommendForUser(final int userId, final int numItems, final int neighborhoodSize)
//			throws Exception {
//
//		List<String> recommendedItems = new ArrayList<String>();
//
//		try {
//			DataModel model = new FileDataModel(getModelFile());
//			UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
//			UserNeighborhood neighborhood = new NearestNUserNeighborhood(neighborhoodSize, similarity, model);
//			Recommender recommender = new GenericUserBasedRecommender(model, neighborhood, similarity);
//			List<RecommendedItem> recommendations = recommender.recommend(userId, numItems);
//			for (RecommendedItem recommendation : recommendations) {
//				System.out.println(recommendation.getItemID() + "," + recommendation.getValue());
//				recommendedItems.add(recommendation.getItemID() + "," + recommendation.getValue());
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return recommendedItems;
//	}
//
//	public static List<String> recommendForItem(final int itemId, final int numItems) throws Exception {
//
//		List<String> recommendedItems = new ArrayList<String>();
//
//		try {
//
//			DataModel model = new FileDataModel(getModelFile());
//			ItemSimilarity itemSimilarity = new LogLikelihoodSimilarity(model);
//			ItemBasedRecommender recommender = new GenericItemBasedRecommender(model, itemSimilarity);
//			List<RecommendedItem> simItems = recommender.mostSimilarItems(itemId, numItems);
//
//			for (RecommendedItem recommendation : simItems) {
//				System.out.println(recommendation);
//				recommendedItems.add(recommendation.getItemID() + "," + recommendation.getValue());
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return recommendedItems;
//	}
//
//	static File getModelFile() {
//		return new File("/vbox/data/ratings.dat");
//	}
//	
//	public static void main(String[] args) {
//		try {
//			recommendForUser(1, 3, 2);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//}
