#!/usr/bin/env bash
# shellcheck disable=SC2004,SC1091

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export GIT_ROOT=$__dir/..

export ERROR_COLOR='\033[1;31m'
export SUCCESS_COLOR='\033[1;32m'
export WARNING_COLOR='\033[0;33m'
export INFO_COLOR='\033[1;34m'
export VARIABLE_COLOR='\033[1;35m'
export NO_COLOR='\033[0m'

msg() {
  printf "$1%s\n"
}

err_msg() {
  msg "${ERROR_COLOR}$1${NO_COLOR}"
}

success_msg() {
  msg "${SUCCESS_COLOR}$1${NO_COLOR}"
}

warn_msg() {
  msg "${WARNING_COLOR}$1${NO_COLOR}"
}

info_msg() {
  msg "${INFO_COLOR}$1${NO_COLOR}"
}

duration_msg() {
  DURATION=$1
  success_msg "DONE $(($DURATION / 60))m $(($DURATION % 60))s"
  echo
}

export -f msg
export -f err_msg
export -f success_msg
export -f warn_msg
export -f info_msg
export -f duration_msg
