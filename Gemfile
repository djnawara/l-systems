source 'https://rubygems.org'

gem 'rails', '~> 8'

# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem 'propshaft'
gem 'sqlite3', '>= 2.1'
gem 'puma', '>= 5.0'
gem 'importmap-rails'
gem 'turbo-rails'
gem 'stimulus-rails'

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem 'solid_cache'
gem 'solid_queue'
gem 'solid_cable'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem 'thruster', require: false

group :development, :test do
  gem 'debug', platforms: %i[ mri windows ], require: 'debug/prelude'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false
end

group :development do
  gem 'web-console'
end

group :test do
  gem 'rspec'
end

gem "tailwindcss-rails", "~> 3.3"
