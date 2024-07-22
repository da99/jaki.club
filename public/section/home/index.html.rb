#
require '../src/JAKI'

JAKI.html5! do
  default_head('home', "#{SETTINGS['SITE_NAME']} Homepage")

  body do
    div.hide.network_error! do
      span "Network error."
      span.msg "Check your Internet connection or try again later."
    end

    div.hide.server_error do
      span.msg 'Server error. Try again later.'
    end

    h1 "Storage Closet"

    main do
      form.login! action: '/login', method: 'post' do
        div.hide.error_msg.session_invalid "Your browser is not compatible with this site."
        button.submit 'Enter'
      end # form

      div.hide.wait! do
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
        p 'Refresh this page AFTER you send the above e-mail address.'
      end # wait!

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/home/index.mjs')) { "" }

  end # body

end # html5
