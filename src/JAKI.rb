
require 'markaby'
require 'json'

SETTINGS = JSON.parse(File.read('./tmp/settings.json'))

module BUILD_TARGET
  extend self

  def name; ENV['BUILD_TARGET']; end
  def dev?; name == 'dev'; end
  def stage?; name == 'stage'; end
  def prod?; name == 'prod'; end
end # module

PUBLIC_FILES = JSON.parse File.read('./tmp/public_files.json')

module Builder
  class XmlMarkup
    def _start_tag(sym, attrs, end_too=false)
      @target << "<#{sym}"
      _insert_attributes(attrs)
      # @target << "/" if end_too
      @target << ">"
    end
  end
end

module JAKI
  extend self

  def static_url(sPath)
    if (BUILD_TARGET.dev?)
      return "http://localhost:#{SETTINGS['STATIC_PORT']}#{sPath}"
    end

    file = PUBLIC_FILES[sPath]
    raise "File not found: #{sPath}" unless file
    "#{SETTINGS['STATIC_URL']}#{File.join '/', BUILD_TARGET.name, file['Key']}";
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

  def html5(*args, &blok)
    args = [{ lang: 'en' }] if args.empty?
    mab = Markaby::Builder.new
    mab.html5(*args, ) do
      extend JAKI
      instance_eval &blok if blok
    end
    mab
  end

  def html5!(*args, &blok)
    puts html5(*args, &blok).to_s
  end
end # module
