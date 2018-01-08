package com.zju.pojo;

import com.zju.model.DatabaseUpdateReport;

public class UpdateInfo {

    private DatabaseUpdateReport updateSummary;
    private String updateDateEnd;
    private String updateDateStart;

    public UpdateInfo(DatabaseUpdateReport updateSummary, String updateDateStart, String updateDateEnd) {
        this.updateSummary = updateSummary;
        this.updateDateEnd = updateDateEnd;
        this.updateDateStart = updateDateStart;
    }

    public DatabaseUpdateReport getUpdateSummary() {
        return updateSummary;
    }

    public void setUpdateSummary(DatabaseUpdateReport updateSummary) {
        this.updateSummary = updateSummary;
    }

    public String getUpdateDateEnd() {
        return updateDateEnd;
    }

    public void setUpdateDateEnd(String updateDateEnd) {
        this.updateDateEnd = updateDateEnd;
    }

    public String getUpdateDateStart() {
        return updateDateStart;
    }

    public void setUpdateDateStart(String updateDateStart) {
        this.updateDateStart = updateDateStart;
    }
}
