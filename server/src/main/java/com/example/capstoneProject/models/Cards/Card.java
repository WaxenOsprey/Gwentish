package com.example.capstoneProject.models.Cards;

import com.example.capstoneProject.models.Player;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name")
    private String name;

    @Column(name = "category", columnDefinition = "TEXT")
    private String category;

    @Column(name = "ability", columnDefinition = "TEXT")
    private String ability;

    @Column(name = "ability_html", columnDefinition = "TEXT")
    private String abilityHtml;

    @Column(name = "keyword_html", columnDefinition = "TEXT")
    private String keywordHtml;

    @Column(name = "flavor", columnDefinition = "TEXT")
    private String flavor;

    @Column(name = "art")
    private int art;

    @Column(name = "card")
    private int card;

    @Column(name = "audio")
    private int audio;

    @Column(name = "card_set")
    private String cardSet;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "armor")
    private int armor;

    @Column(name = "color")
    private String color;

    @Column(name = "unused_power")
    private int unusedPower;

    @Column(name = "reach")
    private int reach;

    @Column(name = "artist")
    private String artist;

    @Column(name = "rarity")
    private String rarity;

    @Column(name = "faction")
    private String faction;

    @Column(name = "related")
    private String related;

    @Column(name = "power")
    private int power;

    @Column(name = "faction_secondary")
    private String factionSecondary;

    @Column(name = "row_type")
    private String rowType;
    @JsonIgnoreProperties({"cards"})
    @ManyToMany
    @JoinTable(
            name = "decks",
            joinColumns = {
                    @JoinColumn(
                            name = "card_id",
                            nullable = false,
                            updatable = false
                    )
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name = "player_id",
                            nullable = false,
                            updatable = false
                    )
            }
    )

    private List<Player> players;



    // Constructor
    public Card(String name, String category, String ability, String abilityHtml, String keywordHtml, String flavor,
                int art, int card, int audio, String cardSet, String cardType, int armor, String color, int unusedPower,
                int reach, String artist, String rarity, String faction, String related, int power,
                String factionSecondary, String rowType) {
        this.name = name;
        this.category = category;
        this.ability = ability;
        this.abilityHtml = abilityHtml;
        this.keywordHtml = keywordHtml;
        this.flavor = flavor;
        this.art = art;
        this.card = card;
        this.audio = audio;
        this.cardSet = cardSet;
        this.cardType = cardType;
        this.armor = armor;
        this.color = color;
        this.unusedPower = unusedPower;
        this.reach = reach;
        this.artist = artist;
        this.rarity = rarity;
        this.faction = faction;
        this.related = related;
        this.power = power;
        this.factionSecondary = factionSecondary;
        this.rowType = rowType;
        this.players = new ArrayList<>();
    }

    public Card() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getAbilityHtml() {
        return abilityHtml;
    }

    public void setAbilityHtml(String abilityHtml) {
        this.abilityHtml = abilityHtml;
    }

    public String getKeywordHtml() {
        return keywordHtml;
    }

    public void setKeywordHtml(String keywordHtml) {
        this.keywordHtml = keywordHtml;
    }

    public String getFlavor() {
        return flavor;
    }

    public void setFlavor(String flavor) {
        this.flavor = flavor;
    }

    public int getArt() {
        return art;
    }

    public void setArt(int art) {
        this.art = art;
    }

    public int getCard() {
        return card;
    }

    public void setCard(int card) {
        this.card = card;
    }

    public int getAudio() {
        return audio;
    }

    public void setAudio(int audio) {
        this.audio = audio;
    }

    public String getCardSet() {
        return cardSet;
    }

    public void setCardSet(String cardSet) {
        this.cardSet = cardSet;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public int getArmor() {
        return armor;
    }

    public void setArmor(int armor) {
        this.armor = armor;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getUnusedPower() {
        return unusedPower;
    }

    public void setUnusedPower(int unusedPower) {
        this.unusedPower = unusedPower;
    }

    public int getReach() {
        return reach;
    }

    public void setReach(int reach) {
        this.reach = reach;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String getFaction() {
        return faction;
    }

    public void setFaction(String faction) {
        this.faction = faction;
    }

    public String getRelated() {
        return related;
    }

    public void setRelated(String related) {
        this.related = related;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public String getFactionSecondary() {
        return factionSecondary;
    }

    public void setFactionSecondary(String factionSecondary) {
        this.factionSecondary = factionSecondary;
    }

    public String getRowType() {
        return rowType;
    }

    public void setRowType(String rowType) {
        this.rowType = rowType;
    }
}
