#!/usr/bin/env bash

run() {
  cd "$(pwd -P)"/packages/"$1" || exit
  bun run build
  cd ../..
}

run "setup"
run "types"
run "validate"
run "array"
run "core"
run "crypto"
run "function"
run "decorator"
run "ksuid"
run "number"
run "object"
run "string"
run "uuid"
run "core"

bun i
