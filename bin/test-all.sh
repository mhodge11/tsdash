#!/usr/bin/env bash

# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/setup.sh"

run() {
  cd "$GIT_ROOT"/packages/"$1" || exit
  bun run test
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
