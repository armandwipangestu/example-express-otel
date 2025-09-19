import { context, trace } from "@opentelemetry/api";

export function tracingLogger(req, res, next) {
    const span = trace.getSpan(context.active());
    if (span) {
        const traceId = span.spanContext().traceId;
        console.log(`[${req.method}] ${req.url} - traceId=${traceId}`);
        res.setHeader("x-trace-id", traceId);
    }
    next();
}
