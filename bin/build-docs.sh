#!/usr/bin/env bash

# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/setup.sh"

run() {
  cd "$GIT_ROOT" || exit
  info_msg "Building $1"
  typedoc --plugin typedoc-plugin-markdown --options typedoc.json --entryPoints "packages/$1/src/index.ts" --out "docs/$1"
}

run "array"
run "crypto"
run "function"
run "decorator"
run "ksuid"
run "number"
run "object"
run "promise"
run "string"
run "types"
run "uuid"
run "validate"