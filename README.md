# jaki.club
  - dev/dev setup
  - dev/dev server

## Intro:
   A do-everything app.


## Notes:
   * https://editorjs.io/configuration

# Options:
  * https://www.novo.co/ Banking


# Workarounds:
  * use `mimetext/browser` for now:
  https://github.com/muratgozel/MIMEText/issues/64#issuecomment-2094925196

# AWS
  "jaki.club")
    case "$1" in
      aws)
        shift
        export CLOUDFLARE_API_TOKEN="""
        export AWS_ACCESS_KEY_ID="""
        export AWS_SECRET_ACCESS_KEY="""
        export AWS_ENDPOINT_URL="""

        export AWS_DEFAULT_REGION="auto"
        export AWS_DEFAULT_OUTPUT="text"
        export AWS_BUCKET="jaki"

        case "$1" in
          list-objects)
            shift
            exec aws s3api list-objects --bucket "$AWS_BUCKET" --output json
            ;;
          *)
            exec aws s3api "$@"
            ;;
        esac
        ;;
      *)
        exit 3
        ;;
    esac
    ;;
