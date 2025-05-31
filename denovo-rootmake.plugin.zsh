typeset -gaU DENOVO_PATH
DENOVO_PATH+=("${0:a:h}")

function rmake() {
  root=$(denovo-dispatch rootmake find-root "$PWD" | jq -r '.result')
  [[ "$root" != "null" ]] && make -C "$root" "$@"
}
