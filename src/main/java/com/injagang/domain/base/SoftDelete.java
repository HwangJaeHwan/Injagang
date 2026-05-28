package com.injagang.domain.base;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
public abstract class SoftDelete extends Timestamp {



    @Column
    private LocalDateTime deletedTime;


    public void softDelete() {
        this.deletedTime = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return this.deletedTime != null;
    }

}
