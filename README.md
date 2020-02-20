## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
## General info
This project is currency conversion rates for a particular currency with all other available currency for the desired period.


## Technologies
Project is created with:
* Ruby version 2.6.3
* Rails Version 4.2.10
* C3 Js Library (For charts)
* D3 Js Library (C3 internally uses it)

## Setup
To run this project, install it locally using npm:

```
$ clone the github repo 
$ cd currency-convert
$ bundle install
If above steps fails try to install rvm from
 "https://rvm.io/"
and then retry bundle install
$ rails s (to run rails server)

To check specs for rspec 
$ rails generate rspec:install
$ rspec spec/controller/currency_conversion_rates.rb
```