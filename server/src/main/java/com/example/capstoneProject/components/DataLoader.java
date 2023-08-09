package com.example.capstoneProject.components;

import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.Cards.Unit;
import com.example.capstoneProject.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    CardRepository cardRepository;

    public DataLoader() {

    }

    public void run(ApplicationArguments args) {
        Card[] cards = new Card[] {
                new Card(
                        "Ciri",
                        "Witcher",
                        "Whenever you lose a round, return this unit from the battlefield to your hand.",
                        "Whenever you lose a round, return this unit from the battlefield to your hand.",
                        "",
                        "I go wherever I please, whenever I please.",
                        1007,
                        112101,
                        1207,
                        "BaseSet",
                        "Unit",
                        0,
                        "Gold",
                        6,
                        0,
                        "Anna Podedworna",
                        "Legendary",
                        "Neutral",
                        "",
                        8,
                        "",
                        "Range"
                ),
                new Card(
                        "Geralt of Rivia",
                        "Witcher",
                        "Deploy: Destroy an enemy with 8 or more power.",
                        "",
                        "",
                        "If that's what it takes to save the world, it's better to let that world die.",
                        1009,
                        112103,
                        1005,
                        "BaseSet",
                        "Unit",
                        0,
                        "Gold",
                        3,
                        0,
                        "Marek Madej",
                        "Legendary",
                        "Neutral",
                        "",
                        10,
                        "",
                        "Melee"
                ),
                new Card(
                        "Temerian Infantry",
                        "Human, Soldier",
                        "Deploy: Damage an enemy by 1 for each boosted unit on this row.",
                        "",
                        "",
                        "Temeria! Temeria! Gods shed all grace on thee! And smite thy foes with horrid woes, for all eternity!",
                        1118,
                        122316,
                        1106,
                        "BaseSet",
                        "Unit",
                        0,
                        "Bronze",
                        3,
                        2,
                        "Marta Dettlaff",
                        "Common",
                        "Northern Realms",
                        "",
                        5,
                        "",
                        "Melee"
                ),
                    new Card(
                            "Odrin",
                            "Human, Soldier",
                            "Deploy: Give 1 Charge to all allied units.",
                            "",
                            "",
                            "Drinkin' without Odrin is like rowin' without a paddle.",
                            1093,
                            122213,
                            1099,
                            "BaseSet",
                            "Unit",
                            0,
                            "Gold",
                            4,
                            0,
                            "Darek Zabrocki",
                            "Epic",
                            "Northern Realms",
                            "",
                            8,
                            "",
                            "Melee"
            ),
                new Card(
                "Kaedweni Sergeant",
                "Human, Soldier",
                "",
                "",
                "",
                "Forward, you sorry sods! Forward or you'll see the Nilfgaardians are the least of your worries!",
                1094,
                122214,
                1178,
                "Unmillable",
                "Unit",
                0,
                "Bronze",
                3,
                0,
                "Ilker Serdar Yildiz",
                "Common",
                "Northern Realms",
                "",
                5,
                "",
                "Melee"
        ),



        new Card(
                    "Poor Fucking Infantry",
                    "Human, Soldier",
                    "Deploy: Boost self by 4.",
                    "",
                    "",
                    "I's a war veteran! Spare me a crown?",
                    1101,
                    200234,
                    1105,
                    "BaseSet",
                    "Unit",
                    0,
                    "Bronze",
                    1,
                    0,
                    "Marta Dettlaff",
                    "Common",
                    "Northern Realms",
                    "",
                    5,
                    "",
                    "Melee"
                ),
                new Card(
                        "Dol Blathanna Archer",
                        "Elf",
                        "",
                        "",
                        "",
                        "Take another step, dh'oine. You'd look better with an arrow between your eyes.",
                        1219,
                        142310,
                        1130,
                        "Unmillable",
                        "Unit",
                        0,
                        "Bronze",
                        3,
                        0,
                        "Ilker Serdar Yildiz",
                        "Common",
                        "Scoiatael",
                        "",
                        5,
                        "",
                        "Range"
                ),
                new Card(
                        "Brokvar Archer",
                        "Human, Warrior",
                        "Deploy, Ranged: Damage an enemy by the amount of damaged units on their side.",
                        "",
                        "",
                        "So ye can hit a movin' target at two hundred paces? Me, too. In a storm.",
                        152315,
                        152315,
                        1071,
                        "BaseSet",
                        "Unit",
                        0,
                        "Bronze",
                        3,
                        0,
                        "Grafit Studio",
                        "Rare",
                        "Skellige",
                        "",
                        5,
                        "",
                        "Range"
                ),

                new Card(
                "Kaedweni Sergeant",
                "Human, Soldier",
                "",
                "",
                "",
                "Forward, you sorry sods! Forward or you'll see the Nilfgaardians are the least of your worries!",
                1094,
                122214,
                1178,
                "Unmillable",
                "Unit",
                0,
                "Bronze",
                3,
                0,
                "Ilker Serdar Yildiz",
                "Common",
                "Northern Realms",
                "",
                5,
                "",
                "Melee"
        ),

        new Card(
                        "Trebuchet",
                        "Machine",
                        "Order, Ranged: Damage a unit by 1. If it was destroyed, damage units adjacent to it by 1.",
                        "",
                        "",
                        "Castle won't batter itself down, now will it? Get them trebuchets rollin'!",
                        122303,
                122303,
                        1019,
                        "BaseSet",
                        "Unit",
                        0,
                        "Bronze",
                        3,
                        0,
                        "Anna Podedworna",
                        "Common",
                        "Northern Realms",
                        "",
                        6,
                        "",
                        "Siege"
                ),
                new Card(
                    "Cleaver",
                    "Dwarf, Bandit",
                    "Deploy: Damage a unit by 1 for every card in your hand.",
                    "",
                    "",
                    "Everyone wantin' to trade in Novigrad's got a clear choice - agree terms with Cleaver or kiss their knees farewell.",
                    1095,
                    122216,
                    1293,
                    "BaseSet",
                    "Unit",
                    0,
                    "Gold",
                    3,
                    2,
                    "Lorenzo Mastroianni",
                    "Epic",
                    "Neutral",
                    "",
                    9,
                    "",
                    "Siege"
        ),

        new Card(
                        "Siege Tower",
                        "Machine",
                        "Order, Melee: Boost adjacent allies by 1.",
                        "",
                        "",
                        "The latest rage in assaults on walled cities.",
                        122304,
                122304,
                        1140,
                        "BaseSet",
                        "Unit",
                        0,
                        "Bronze",
                        3,
                        0,
                        "Noah Bradley",
                        "Rare",
                        "Northern Realms",
                        "",
                        5,
                        "",
                        "Siege"
                ),

                new Card(
                "Ballista",
                "Machine",
                "",
                "",
                "",
                "What crossbows want to be when they grow up.",
                1096,
                122301,
                1018,
                "Unmillable",
                "Unit",
                0,
                "Bronze",
                4,
                2,
                "Anna Podedworna",
                "Common",
                "Northern Realms",
                "",
                5,
                "",
                "Siege"
        ),

        new Card(
                "Reinforced Ballista",
                "Machine",
                "",
                "",
                "",
                "Never manages to hit the same place twice, which, upon further reflection, might constitute a real problem.",
                1097,
                122302,
                1557,
                "BaseSet",
                "Unit",
                0,
                "Bronze",
                3,
                2,
                "Noah Bradley",
                "Rare",
                "Northern Realms",
                "",
                5,
                "",
                "Siege"
        ),
                new Card(
                "Kaedweni Cavalry",
                "Human, Knight",
                "",
                "",
                "",
                "Always wondered – how the blazes do those lads handle nature's call…?",
                1115,
                122314,
                1104,
                "BaseSet",
                "Unit",
                0,
                "Bronze",
                4,
                0,
                "Grafit Studio",
                "Rare",
                "Northern Realms",
                "",
                4,
                "",
                "Melee"
        ),
                new Card(
                "Old Speartip",
                "Ogroid",
                "No ability.\n",
                "No ability.\n",
                "",
                "Oh, you're in a heap of trouble now...",
                144,
                133402,
                1196,
                "BaseSet",
                "Unit",
                0,
                "Bronze",
                12,
                2,
                "Grafit Studio",
                "Epic",
                "Monster",
                "",
                11,
                "",
                "Range"
        ),
                new Card(
                "Zoltan Chivay",
                "Dwarf",
                "",
                "",
                "",
                "Drinkin' alone's like crappin' with company.",
                152,
                138301,
                1119,
                "BaseSet",
                "Unit",
                0,
                "Gold",
                2,
                0,
                "Anna Podedworna",
                "Legendary",
                "Scoiatael",
                "",
                10,
                "",
                "Melee"
        ),




//                new Card(
//                        "Decoy",
//                        "Tactic",
//                        "Return a Unit back to your Hand",
//                        "",
//                        "",
//                        "When you run out of peasants, decoys also make decent arrow fodder.",
//                        113201,
//                        1042,
//                        1562,
//                        "BaseSet",
//                        "Special",
//                        0,
//                        "Gold",
//                        0,
//                        0,
//                        "Marek Madej",
//                        "Epic",
//                        "Neutral",
//                        "",
//                        7,
//                        "",
//                        "N/A"
//                ),
//                new Card(
//                        "Commander's Horn",
//                        "Tactic",
//                        "Double power of Row",
//                        "",
//                        "",
//                        "Plus one to morale, minus one to hearing.",
//                        113207,
//                        1048,
//                        1561,
//                        "BaseSet",
//                        "Special",
//                        0,
//                        "Gold",
//                        0,
//                        0,
//                        "Bartłomiej Gaweł",
//                        "Epic",
//                        "Neutral",
//                        "",
//                        14,
//                        "",
//                        "N/A"
//                )
        };

        List<Card> updatedCards = new ArrayList<>();

        for (Card card : cards) {
            int duplicationCount;
            switch (card.getRarity()) {
                case "Legendary":
                    duplicationCount = 1;
                    break;
                case "Epic":
                    duplicationCount = 4;
                    break;
                case "Rare":
                    duplicationCount = 6;
                    break;
                case "Common":
                    duplicationCount = 8;
                    break;
                default:
                    duplicationCount = 0;
                    break;
            }

            for (int i = 0; i < duplicationCount; i++) {
                Card duplicateCard = new Card(
                        card.getName(),
                        card.getCategory(),
                        card.getAbility(),
                        card.getAbilityHtml(),
                        card.getKeywordHtml(),
                        card.getFlavor(),
                        card.getArt(),
                        card.getCard(),
                        card.getAudio(),
                        card.getCardSet(),
                        card.getCardType(),
                        card.getArmor(),
                        card.getColor(),
                        card.getUnusedPower(),
                        card.getReach(),
                        card.getArtist(),
                        card.getRarity(),
                        card.getFaction(),
                        card.getRelated(),
                        card.getPower(),
                        card.getFactionSecondary(),
                        card.getRowType()
                );
                updatedCards.add(duplicateCard);
            }
        }

        for (Card updatedCard : updatedCards) {
            cardRepository.save(updatedCard);
        }

    }
}
