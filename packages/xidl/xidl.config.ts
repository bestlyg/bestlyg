import { defineConfig, TypescriptPlugin } from './dist';
// import {mobius} from './output/typescript'

// const a = mobius.event.MobiusEventType.MOBIUS_EVENT_TYPE_END

export default defineConfig({
    input: {
        // main: "./protoc/mobius-event.proto",
        main: './protoc/example.proto',
    },
    output: { clean: false, dist: './output' },
    // plugins: [new PythonPlugin()],
    plugins: [new TypescriptPlugin()],
});
