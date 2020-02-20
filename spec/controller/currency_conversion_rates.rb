require 'rails_helper'

describe CurrencyConversionsController do
  describe 'get currency conversion rates for a particular time period for a valid currency code' do
    it 'should return a json object' do
      params = {currency: 'USD',
                start_date: Date.today - 1.months,
                end_date: Date.today}
      conversion_rate =  ConversionRate.new(params)
      conversion_rates = conversion_rate.get_conversion_rate
      expect(conversion_rates.keys).not_to eq 0
    end
  end

  describe 'get currency conversion rates for a particular time period for an ivalid currency code' do
    it 'should return error object' do
      params = {currency: 'ABC',
                start_date: Date.today - 1.months,
                end_date: Date.today}
      conversion_rate =  ConversionRate.new(params)
      conversion_rates = conversion_rate.get_conversion_rate
      expect(conversion_rates).to eq nil
    end
  end
end