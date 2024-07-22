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
            span 'TO:'
            span.key(data: {key: 'login_email'}) { '{ENTER_EMAIL}' }
            span 'SUBJECT:'
            span.key(data: {key: 'login_code'}) { '{CODE_VALUE}' }
          end
        end
        p 'Refresh this page AFTER you send the above e-mail address..'
        div do
          span.key(data: {key: 'count_down'}) { '{COUNT_DOWN_VALUE}' }
          span 'seconds left'
        end
      end # wait!

      div.hide.user_is_in! do
        p do
          span 'Is this your email address?'
          span.user_email! '{{EMAIL}}'
        end

        p do
          button.yes_and_reload!(type: 'button') { 'Yes' }
          button.no_and_logout!(type: 'button') { 'No!' }
        end
      end

      div.hide.expired! do
       p 'Time has expired.'
       button.start_over!(type: 'button') { 'Start Over' }
      end # expired!

      div.hide.reloading_now! 'Reloading this page. Please wait a few seconds...'

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/home/index.mjs')) { "" }

    template.sample! do
      div {
        p {
          span "My link is: "
          a(href: "{LINK}") { span "{msg}" }
        }
        template(data: {loop: 'links'}) {
          pre {
            span '{name}'
            span ': '
            span '{href}'
          }
        }
        template(data: {id: 'big', key: 'hope'}) { }
      }
    end

    template.big! {
      div {
        h3 '{first}'
        span ': '
        h3 '{last}'
      }
    }

  end # body

end # html5
