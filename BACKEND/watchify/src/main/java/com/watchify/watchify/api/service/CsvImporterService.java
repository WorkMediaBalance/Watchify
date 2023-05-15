package com.watchify.watchify.api.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CsvImporterService {

    @Transactional
    public void importCsv() {
        System.out.println("돼?????");
        Map<String, Long> genreMap = new HashMap<>();
        genreMap.put("'액션'", 1l);
        genreMap.put("'애니메이션'", 2l);
        genreMap.put("'코미디'", 3l);
        genreMap.put("'범죄'", 4l);
        genreMap.put("'다큐멘터리'", 5l);
        genreMap.put("'드라마'", 6l);
        genreMap.put("'판타지'", 7l);
        genreMap.put("'역사'", 8l);
        genreMap.put("'공포'", 9l);
        genreMap.put("'가족'", 10l);
        genreMap.put("'음악'", 11l);
        genreMap.put("'스릴러'", 12l);
        genreMap.put("'로맨스'", 13l);
        genreMap.put("'SF'", 14l);
        genreMap.put("'스포츠'", 15l);
        genreMap.put("'전쟁'", 16l);
        genreMap.put("'서부'", 17l);
        genreMap.put("'RealityTV'", 18l);
        genreMap.put("'MadeinEurope'", 19l);
        genreMap.put("", 20l);

        Map<Integer, String> ottMap = new HashMap<>();
        ottMap.put(1, "netflix");
        ottMap.put(2, "watcha");
        ottMap.put(3, "wavve");
        ottMap.put(4, "diseny");



        String csvFile = "dataInput/ver2.csv";
//        String csvFile = "dataInput/test.csv";
        String databaseUrl = "jdbc:mysql://watchifydb.cph3uafcff1h.ap-northeast-2.rds.amazonaws.com/sins?useUnicode=true&characterEncoding=utf8&s&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true&tinyInt1isBit=false";
        String databaseUser = "watchifyadmin";
        String databasePassword = "qudwlsgoa";
        String contentTable = "content";
        //   0      1        2          3           4          5         6        7             8              9         10       11       12         13     14
        //  id    title , season, release_date, rate_imdb, popularity, genres, run_time, audience_age, episode_cnt, Synopsis, images, backdrops, ottlink, ott
        try (Connection connection = DriverManager.getConnection(databaseUrl, databaseUser, databasePassword);
             PreparedStatement statement = connection.prepareStatement("INSERT INTO " + contentTable +
                     " (title, season, release_date, rate, runTime, audience_age, final_episode, summarize, img_path, backdrop_path, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
             PreparedStatement statementContentOTT = connection.prepareStatement("INSERT INTO contentott (content_id, ott_id, ott_url) VALUES (?, ?, ?)");
             PreparedStatement statementContentGenre = connection.prepareStatement("INSERT INTO content_genre (content_id, genre_id) VALUES (?, ?)");
             PreparedStatement statementTurnContent = connection.prepareStatement("INSERT INTO turn_content (content_id, episode) VALUES (?, ?)");
             BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(csvFile), "EUC-KR"));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT)) {

            for (CSVRecord csvRecord : csvParser) {
//                System.out.println(csvRecord);
                Long contentID = Long.parseLong(csvRecord.get(0));
                Integer finalEpisode = Integer.parseInt(csvRecord.get(9));
                String imgPath = s3imgPath(contentID);
                String backImg = s3BackdropPath(contentID);

                System.out.println("contentID : " + contentID);
                statement.setString(1, csvRecord.get(1)); // title
                statement.setInt(2, Integer.parseInt(csvRecord.get(2))); // season
                statement.setInt(3, Integer.parseInt(csvRecord.get(3))); // release_date
                statement.setDouble(4, Double.parseDouble(csvRecord.get(5))); // rate
                statement.setInt(5, Integer.parseInt(csvRecord.get(7))); // runTime
                statement.setInt(6, Integer.parseInt(csvRecord.get(8))); // audience_age
                statement.setInt(7, finalEpisode); // final_episode
                statement.setString(8, csvRecord.get(10)); // summarize
                statement.setString(9, imgPath); // img_path
                statement.setString(10, backImg); // backdrop_path
                statement.setLong(11, contentID); // id

//                 statement.executeUpdate(); // 쿼리 한문장마다 실행 디버그용

                String OTTs = csvRecord.get(14);  // 이건 "[1, 2, 3]" 형태의 문자열을 가져옴
                OTTs = OTTs.substring(1, OTTs.length()-1);  // "[" 와 "]"를 제거
                String[] OTT_ids = OTTs.split(", ");  // 쉼표와 공백으로 분리
                String conectionUrl = csvRecord.get(13);
                conectionUrl = conectionUrl.substring(1, conectionUrl.length()-1);
                String[] urls = conectionUrl.split(", ");

                if (!OTT_ids[0].equals("")) {
                    for (int i=0; i < OTT_ids.length; i ++) {
                        String url = urls[i].replace("'", "");
                        statementContentOTT.setLong(1, contentID);  // content_id 설정
                        statementContentOTT.setLong(2, Long.parseLong(OTT_ids[i]));  // ott_id 설정
                        System.out.println("ott id : " + OTT_ids[i]);
                        statementContentOTT.setString(3, url); // ott_url 설정
                        statementContentOTT.addBatch();
                    }
                }

                String Genres = csvRecord.get(6); // 장르 리스트 문자열
                Genres = Genres.substring(1, Genres.length()-1);  // "[" 와 "]"를 제거
                String[] GenreNames = Genres.split(", ");
                for (String genreName : GenreNames) {
                    Long genreID = genreMap.get(genreName);
                    statementContentGenre.setLong(1, contentID);
                    statementContentGenre.setLong(2, genreID);
                    statementContentGenre.addBatch();
//                     statementContentGenre.executeUpdate(); // 쿼리 한문장마다 실행 디버그용
                }

                statementTurnContent.setLong(1, contentID);
                if (finalEpisode == 0) {
                    statementTurnContent.setInt(2, 0);
                    statementTurnContent.addBatch();
//                    statementTurnContent.executeUpdate(); // 쿼리 한문장 씩 실행
                } else {
                    for (int i = 1; i < finalEpisode+1; i++) {
                        statementTurnContent.setInt(2, i);
                        statementTurnContent.addBatch();
//                        statementTurnContent.executeUpdate(); // 쿼리 한문장 씩 실행
                    }
                }

                statement.addBatch();
            }

            statement.executeBatch();
            statementContentOTT.executeBatch();
            statementContentGenre.executeBatch();
            statementTurnContent.executeBatch();

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("안돼?????????");
        }
    }

    public String s3BackdropPath(Long id) {
        return "https://watchify.s3.ap-northeast-2.amazonaws.com/backdrop/" + id + ".PNG";
    }

    public String s3imgPath(Long id) {
        return "https://watchify.s3.ap-northeast-2.amazonaws.com/poster/" + id + ".PNG";
    }
}