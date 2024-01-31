package org.jackpot.back.card.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.jackpot.back.culturalHeritage.model.entity.CulturalHeritage;
import org.jackpot.back.user.model.entity.User;

import java.util.Date;

@Entity
@Table(name="holding_card")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class HoldingCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id; //보유 아이디

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user; //사용자 아이디

    @ManyToOne
    @JoinColumn(name="card_number")
    private Card card; //카드 번호

    @Column(length = 512)
    @Temporal(TemporalType.TIMESTAMP)
    @NotNull
    private Date date; //카드 획득일
}
