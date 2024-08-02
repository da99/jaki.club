#
require '../src/JAKI'

JAKI.html5! do
  default_head('home', "#{SETTINGS['SITE_NAME']} Homepage")

  body do
    h1 "Storage Closet"

    main do
      div.wait! do
        div do
          p 'Send an e-mail with the following values:'
          div do
            p {
              span 'TO: '
              a.key(href: '{MAILTO}', data: {key: 'login_email'}) {
                '{EMAIL}'
              }
            }
            p {
              span 'SUBJECT: '
              span.key(data: {key: 'login_code'}) { '{CODE_VALUE}' }
            }
          end
        end
      end # wait!

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/home/index.mjs')) { "" }

  end # body

end # html5
