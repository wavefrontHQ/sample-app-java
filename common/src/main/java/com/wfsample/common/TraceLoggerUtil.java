package com.wfsample.common;

import com.wavefront.opentracing.WavefrontTracer;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;

public class TraceLoggerUtil {
    private static final String TRACE_ID = "traceId";
    public static void traceLog(Logger logger, String traceID, Level level, String message) {
        if (!message.isEmpty()) {
            ThreadContext.put(TRACE_ID, traceID);
            logger.log(level, message);
            ThreadContext.remove(TRACE_ID);
        }
    }
    public static void traceLog(Logger logger, WavefrontTracer tracer, Level level, String message) {
        if (!message.isEmpty()) {
            if (tracer.activeSpan()!= null && !tracer.activeSpan().context().toTraceId().isEmpty()) {
                ThreadContext.put(TRACE_ID, tracer.activeSpan().context().toTraceId());
            }
            logger.log(level, message);
            ThreadContext.remove(TRACE_ID);
        }
    }
}
