#
require '../src/JAKI'

JAKI.html5! do
  default_head('enter', "#{SETTINGS['SITE_NAME']} Homepage")

  body do
    h1 "Enter: #{SETTINGS['SITE_NAME']}"

    main do

      div.wait! do
        form do
          p "Is this your email?"
          fieldset do
            input.email!(type: 'text') { "{EMAIL}" }
          end # do
          fieldset do
            button "Yes"
            button "No"
          end # do
        end
      end

      div.log_in! do
        form do
          p.confirm_email "{EMAIL}"
          p "Enter the code sent to this address:"
          p.hide.error.wrong_code "Wrong code. Try again."
          fieldset do
            input.code!(type: 'text')
          end # do
        end # do
      end # do

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/enter/index.mjs')) { "" }

  end # body

end # html5
