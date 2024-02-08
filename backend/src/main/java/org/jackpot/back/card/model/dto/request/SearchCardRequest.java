package org.jackpot.back.card.model.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jackpot.back.card.model.entity.enums.CardField;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class SearchCardRequest {
    String userEmail;
    String keywrod; //검색어
    String division; //종목
    CardField field; //속성
    int sort; //1(이름순) or 2(최신순) or 3(등급순_내림차순) or 4(등급순_오름차순)
}