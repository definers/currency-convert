
## Currency Conversion Rates

currency-convert rates for a particular currency with all other available currency for the desired period.

## Description
A visitor can view the currency conversion rate for the desired period for a particular currency. ex: User wants to know what are the currency conversion rates of USD to different currencies for 1st January 2019 to 31st January 2019.
## Technologies

* Ruby version 2.6.3
* Rails Version 4.2.10
* C3 Js Library (For charts)
* D3 Js Library (C3 internally uses it)
*  exchangeratesapi Public APIs used to get the currency conversion rates

## Setup
```
$ git clone https://github.com/definers/currency-convert.git

$ cd currency-convert

$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

$ curl -sSL https://get.rvm.io | bash -s stable --ruby

$ source /home/username/.rvm/scripts/rvm

$ bundle install

$ rails s

hit localhost:3000 in your web browser.
```
## Nokigiri Error Fix
ERROR : An error occurred while installing nokogiri (1.10.8), and Bundler
        cannot continue.
````
$ gem install nokogiri -v '1.10.8'

$ bundle install

still facing some error then follow below steps

$ gem uninstall bundler

$ gem install bundler -v 1.17.3

$ bundle _1.17.3_ install 

$ rails s

Solved!!
````


## To Run Test Cases
```` 
$ rails generate rspec:install
$ rspec spec/controller/currency_conversion_rates.rb
````