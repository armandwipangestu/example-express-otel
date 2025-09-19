import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";

const traceExporter = new OTLPTraceExporter({
    url:
        process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
        "http://otel-collector:4318/v1/traces",
});

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "example-express-otel",
    }),
    spanProcessor: new BatchSpanProcessor(traceExporter),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on("SIGTERM", () => {
    sdk.shutdown().then(
        () => console.log("OTel SDK shut down successfully"),
        (err) => console.log("Error shutting down OTel SDK", err)
    );
});
