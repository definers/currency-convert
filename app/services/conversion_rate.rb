require 'net/http'
require 'json'

class ConversionRate
  def initialize (params)
    @currency = params[:currency]
    @start_date = params[:start_date]
    @end_date = params[:end_date]
    @url = "https://api.exchangeratesapi.io/history?start_at=#{@start_date}&end_at=#{@end_date}&base=#{@currency}"
    @uri = URI(@url)
  end

  def get_conversion_rate
    begin
      response = Net::HTTP.get(@uri) if @uri.present?
      response_obj = JSON.parse(response)
    rescue
      response_obj[:status] = 'error'
    end
    response_obj['rates']
  end
end