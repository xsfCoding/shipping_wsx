package com.zju.typehandler;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.io.IOException;

public class DoubleToStringSerializer extends ToStringSerializer {

    @Override
    public void serialize(Object value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeString(String.format("%.2f", (double)value));
    }
}
