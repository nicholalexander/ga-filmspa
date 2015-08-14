require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'pry'

class MyMovieApi < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  # Set your root path
  get '/' do
    File.read('views/index.html')
  end

  # list all the favorites (being stored in the data.json file)
  get '/favorites' do
    response.header['Content-Type'] = 'application/json'
    File.read('data.json')
  end

  # add a movie to your favorites - use the post method!
  # our data.json is going to be a simple hash with the movie name
  # returning a simple oid
  # TODO handle errors when data.json is empty file
  post '/favorites' do
    file = JSON.parse(File.read('data.json'))
    unless params[:name] && params[:oid]
      return 'Invalid Request'
    end
    movie = { name: params[:name], oid: params[:oid] }
    file[movie[:name]] = movie[:oid]
    File.write('data.json', JSON.pretty_generate(file))
    movie.to_json
  end

  run! if app_file == $0
end


