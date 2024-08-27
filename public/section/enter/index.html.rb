#
require './src/JAKI'

JAKI.html5! do
  default_head('enter', "Enter #{SETTINGS['SITE_NAME']}")

  body do
    h1 "Enter: #{SETTINGS['SITE_NAME']}"

    main do
      div.wait! do
        form do
          p 'Is this your email?'
          div.confirm_email '{EMAIL}'
          fieldset do
            button 'Yes'
            button 'No'
          end # do
        end
      end

      div.log_in! do
        form do
          div.confirm_email '{EMAIL}'
          p 'Enter the code sent to this address:'
          p.hide.error.wrong_code 'Wrong code. Try again.'
          fieldset do
            input.code!(type: 'text', maxlength: 10)
          end # do
            fieldset do
              button 'Submit'
              button 'Cancel'
            end # do
        end # do
      end # do
    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/enter/index.mjs')) { "" }
  end # body
end # html5
