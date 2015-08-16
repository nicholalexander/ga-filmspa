require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'pry'
require 'httparty'

class MyMovieApi < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  # Set your root path
  get '/' do
    File.read('views/index.html')
  end

  # post '/search-omdb' do 
  #   film = params[:name]
  #   # sample query: http://www.omdbapi.com/?s=star+wars&y&r=json
  #   film = film.gsub(" ", "+") 
  #   query = "http://omdbapi.com/?s=#{film}&y&r=json"
  #   response = HTTParty.get("http://omdbi.com/#{query}")
  #   binding.pry
  #   redirect 'results'
  # end

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


