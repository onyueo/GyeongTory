package org.jackpot.back.card.model.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Getter;
import org.jackpot.back.card.model.entity.enums.CardField;
import org.jackpot.back.culturalHeritage.model.entity.CulturalHeritage;
import org.jackpot.back.culturalHeritage.model.entity.CulturalHeritageRedis;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "card_redis", timeToLive = 300)
public class CardRedis {
    @Id
    private Long number; //카드 번호
    private CulturalHeritageRedis cultural_heritage_redis; //문화재 외래키
    private Integer rating; //등급
    private CardField field; //속성 (공,수,힐)
}
