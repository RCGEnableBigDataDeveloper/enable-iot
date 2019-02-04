//package test;
//
//import java.util.Random;
//
//import hex.genmodel.MojoModel;
//import hex.genmodel.easy.EasyPredictModelWrapper;
//import hex.genmodel.easy.RowData;
//import hex.genmodel.easy.prediction.BinomialModelPrediction;
//
//public class main {
//	public static void main(String[] args) throws Exception {
//
//		// model_id auc logloss
//		// 1 GBM_grid_0_AutoML_20181009_113459_model_80 0.9862572 0.006065810
//		// 2 GLM_grid_0_AutoML_20181009_113459_model_0 0.9845400 0.004166795
//		// 3 GBM_grid_0_AutoML_20181009_113459_model_92 0.9826079 0.005314651
//		// 4 GBM_grid_0_AutoML_20181009_113459_model_85 0.9823562 0.005342072
//		// 5 GBM_grid_0_AutoML_20181009_113459_model_5 0.9815969 0.006152005
//		// 6 GBM_grid_0_AutoML_20181009_113459_model_116 0.9812319 0.005257413
//		// mean_per_class_error rmse mse
//		// 1 0.10823122 0.03669420 0.0013464645
//		// 2 0.09861741 0.02870676 0.0008240779
//		// 3 0.14100051 0.03044281 0.0009267647
//		// 4 0.13524418 0.03189306 0.0010171673
//		// 5 0.18341527 0.03220080 0.0010368914
//		// 6 0.12759956 0.02999996 0.0008999978
//
//		EasyPredictModelWrapper model = new EasyPredictModelWrapper(MojoModel
//				.load("/vbox/enable-workspace/enable-retail/lib/GBM_grid_0_AutoML_20181009_113459_model_80.zip"));
//
//		Random random = new Random();
//
//		for (int i = 0; i < 100; i++) {
//
//			String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1);
//
//			RowData row = new RowData();
//			row.put("Time", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V1", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V2", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V3", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V4", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V5", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V6", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V7", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V8", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V9", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V10", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V11", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V12", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V13", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V14", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V15", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V16", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V17", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V18", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V19", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V20", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V21", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V22", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V23", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V24", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V25", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V26", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V27", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("V28", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("Amount", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("lon", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//			row.put("lat", String.valueOf(random.nextBoolean() ? random.nextInt(1000) : random.nextInt(1000) * -1));
//
//			BinomialModelPrediction p = model.predictBinomial(row);
//			if (p.classProbabilities[1] > .27)
//				System.out.println(p.classProbabilities[1]);
//		}
//	}
//
//}
