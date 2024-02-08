#!/bin/bash
protoc --plugin=../../node_modules/.bin/protoc-gen-ts_proto -I=./micro-proto --ts_proto_out=./micro-gen-proto ./micro-proto/*.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
