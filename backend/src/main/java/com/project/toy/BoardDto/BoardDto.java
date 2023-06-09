package com.project.toy.BoardDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BoardDto {
    private String title;

    private String name;

    private String skillStack;

    private String workField;

    private String maxPeople;

    private String endDate;

    private String content;

    private LocalDate postEndDate;
}
