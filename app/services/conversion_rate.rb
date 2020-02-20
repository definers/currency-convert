require 'json'
require 'net/http'
# Service to make a http request to exchangeratesapi and get the json object
class ConversionRate
  def initialize (params)
    @currency = params[:currency]
    @start_date = params[:start_date]
    @end_date = params[:end_date]
    @url = "#{Rails.configuration.exchangerates_api}/history?start_at=#{@start_date}&end_at=#{@end_date}&base=#{@currency}"
    @uri = URI(@url)
  end

  def get_conversion_rate
    begin
      response = Net::HTTP.get(@uri) if @uri.present?
      response_obj = JSON.parse(response) if response.present?
    rescue
      response_obj[:status] = 'error'
    end
    response_obj['rates']
  end

  # Method to get the supported latest currencies by exchangerateapis
  def self.get_all_supported_currencies
    url = URI("#{Rails.configuration.exchangerates_api}/latest")
    response = Net::HTTP.get(url)
    response_obj = JSON.parse(response)
    response_obj["rates"].keys
  end
end