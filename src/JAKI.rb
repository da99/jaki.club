
SETTINGS = JSON.parse(File.read('./settings.json'))

IS_DEV = !!ENV['IS_DEV']


module JAKI
  extend self
  def static_url(sPath)
    if (IS_DEV)
      return "http://localhost:#{SETTINGS['STATIC_PORT']}#{sPath}"
    end

    "#{SETTINGS['STATIC_URL']}#{sPath}";
  end

  def default_head(section, s_title)
    head {
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      title s_title
      link rel: "stylesheet", href: static_url('/styles/reset.css')
      link rel: "stylesheet", href: static_url('/styles/pure.css')
      link rel: "stylesheet", href: static_url("/section/#{section}/index.css")
      yield if block_given?
    }
  end
end # module
