package com.rcggs.datalake.core.model;

import java.io.Serializable;

public class SchemaDef implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private String value;
	private boolean editing;
	private String udfname;
	private boolean checked;

	private int startPos;
	private int endPos;
	private int width;
	
	private boolean isFixedWidth;
	
	public boolean isFixedWidth() {
		return isFixedWidth;
	}

	public void setFixedWidth(boolean isFixedWidth) {
		this.isFixedWidth = isFixedWidth;
	}

	public int getStartPos() {
		return startPos;
	}

	public void setStartPos(int startPos) {
		this.startPos = startPos;
	}

	public int getEndPos() {
		return endPos;
	}

	public void setEndPos(int endPos) {
		this.endPos = endPos;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public boolean isEditing() {
		return editing;
	}

	public void setEditing(boolean editing) {
		this.editing = editing;
	}

	public String getUdfname() {
		return udfname;
	}

	public void setUdfname(String udfname) {
		this.udfname = udfname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
}
