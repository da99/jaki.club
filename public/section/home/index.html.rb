#
require './src/JAKI'

JAKI.html5! do
  default_head('home', "#{SETTINGS['SITE_NAME']} Homepage")

  body do
    h1 "Storage Closet"

    main do
      div.wait! do
        div do
          p 'Send an e-mail with the following values:'
          div.email! do
            p.to {
              span.field 'To: '
              span.value {
                a.key(href: '{MAILTO}', data: {key: 'login_email'}) {
                  '{EMAIL}'
                }
              }
            }
            p.subject {
              span.field 'Subject: '
              span.value { 'ENTER' }
            }
          end
        end
      end # wait!

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/home/index.mjs')) { "" }

  end # body

end # html5
