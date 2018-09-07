import * as actions from '../actions';
import * as types from '../actionTypes';
import api from '../../../api';

jest.mock('../../../api');

describe('Order Confirming Actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('sendOrder()', () => {
		const itemsIds = ['34rc3', '567uh'];
		const apiResponseWithError = {
			err: true,
			data: 'error message'
		};
		const apiResponseWithoutError = {
			err: false,
			data: {
				code: 'xddd'
			}
		};
		const mockDispatch = jest.fn();

		it('calls api function to send ordered items', async () => {
			api.addOrder.mockReturnValueOnce(Promise.resolve(apiResponseWithoutError));

			await actions.sendOrder(itemsIds)(mockDispatch);

			expect(api.addOrder).toHaveBeenCalledWith(itemsIds);
		});

		it('opens the order confirmation, if it is no error after getting response', async () => {
			api.addOrder
				.mockReturnValueOnce(Promise.resolve(apiResponseWithoutError))
				.mockReturnValueOnce(Promise.resolve(apiResponseWithError));

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledWith({
				type: types.SHOW_ORDER_CONFIRMATION
			});

			jest.clearAllMocks();

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledTimes(0);
		});

		it('sets the code, if it is no error after getting response', async () => {
			api.addOrder
				.mockReturnValueOnce(Promise.resolve(apiResponseWithoutError))
				.mockReturnValueOnce(Promise.resolve(apiResponseWithError));

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledWith({
				type: types.SET_CODE,
				payload: apiResponseWithoutError.data.code
			});

			jest.clearAllMocks();

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledTimes(0);
		});
	});
});