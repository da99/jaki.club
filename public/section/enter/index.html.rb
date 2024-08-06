#
require '../src/JAKI'

JAKI.html5! do
  default_head('enter', "#{SETTINGS['SITE_NAME']} Homepage")

  body do
    h1 "Title does here."

    main do
      div.wait! do
        "Content goes here."
      end

    end # main

    footer { span.copyright '(c) 2024. All rights reserved.' }
    script(type: 'module', src: JAKI.static_url('/section/enter/index.mjs')) { "" }

  end # body

end # html5
